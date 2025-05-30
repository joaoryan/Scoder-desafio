import { PrismaClient } from '../generated/prisma';
import {
  AddProdutcsRepository,
  DeleteProductsRepository,
  LoadProductsRepository,
  UpadateProductsRepository
} from '../data/protocols';
import { ProdutcsModel } from '../domain/models/produtcs';
import { emitProductUpdate } from './websocket/socket-emitter';
import { redis } from '../infra/cache/redis';

const prisma = new PrismaClient();
const CACHE_KEY = 'products:all';

export class ProdutcsRepository
  implements AddProdutcsRepository, LoadProductsRepository, DeleteProductsRepository, UpadateProductsRepository {

  private async updateCacheIfExistsWith(products: ProdutcsModel[]): Promise<void> {
    const exists = await redis.exists(CACHE_KEY);
    if (exists) {
      await redis.set(CACHE_KEY, JSON.stringify(products), 'EX', 300);
      console.log('♻️ Cache atualizado diretamente (sem nova consulta)');
      emitProductUpdate(products);
    } else {
      const products = await prisma.products.findMany();

      await redis.set(CACHE_KEY, JSON.stringify(products), 'EX', 300);
      emitProductUpdate(products);
      console.log('📦 Cache recriado após expiração');
    }
  }

  async loadProdutcs(): Promise<ProdutcsModel[] | null> {
    const cached = await redis.get(CACHE_KEY);

    if (cached) {
      console.log('🔁 Retornado do cache Redis');

      emitProductUpdate(JSON.parse(cached));
      return JSON.parse(cached);
    }

    const products = await prisma.products.findMany();

    await redis.set(CACHE_KEY, JSON.stringify(products), 'EX', 300);
    console.log('📦 Cache recriado após expiração');

    emitProductUpdate(products);

    return products;
  }

  async deleteProducts(params: DeleteProductsRepository.Parameter): Promise<boolean> {
    try {
      await prisma.products.delete({
        where: { id: Number(params.id) }
      });

      const currentCached = await redis.get(CACHE_KEY);
      let updatedList: ProdutcsModel[] = [];

      if (currentCached) {
        updatedList = JSON.parse(currentCached).filter((p: ProdutcsModel) =>
          p.id !== Number(params.id)
        );
      }

      await this.updateCacheIfExistsWith(updatedList);

      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return false;
    }
  }


  async updateProducts(params: UpadateProductsRepository.Parameter): Promise<ProdutcsModel> {
    const { id, produtcsData } = params;

    const updated = await prisma.products.update({
      where: { id },
      data: produtcsData
    });

    const currentCached = await redis.get(CACHE_KEY);
    let updatedList: ProdutcsModel[] = [];

    if (currentCached) {
      updatedList = JSON.parse(currentCached).map((p: ProdutcsModel) =>
        p.id === id ? updated : p
      );
    }

    await this.updateCacheIfExistsWith(updatedList);

    return updated;
  }


  async addProdutcs(params: AddProdutcsRepository.Parameter): Promise<ProdutcsModel> {
    const created = await prisma.products.create({ data: params.produtcsData });

    const currentCached = await redis.get(CACHE_KEY);
    const currentProducts = currentCached ? JSON.parse(currentCached) as ProdutcsModel[] : [];

    const updatedList = [...currentProducts, created];
    await this.updateCacheIfExistsWith(updatedList);

    return created;
  }
}
