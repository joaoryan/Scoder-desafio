import { PrismaClient } from '../generated/prisma';
import {
  AddProductsRepository,
  DeleteProductsRepository,
  LoadProductsRepository,
  UpadateProductsRepository
} from '../data/protocols';
import { ProductsModel } from '../domain/models/products';
import { emitProductUpdate } from './websocket/socket-emitter';
import { redis } from './cache/redis';

const prisma = new PrismaClient();

const CACHE_KEY = 'products:all';

export class ProductsRepository
  implements AddProductsRepository, LoadProductsRepository, DeleteProductsRepository, UpadateProductsRepository {

  private async updateCacheIfExistsWith(products: ProductsModel[]): Promise<void> {
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

  async loadProducts(): Promise<ProductsModel[] | null> {
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
      let updatedList: ProductsModel[] = [];

      if (currentCached) {
        updatedList = JSON.parse(currentCached).filter((p: ProductsModel) =>
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


  async updateProducts(params: UpadateProductsRepository.Parameter): Promise<ProductsModel> {
    const { id, productsData } = params;

    const updated = await prisma.products.update({
      where: { id },
      data: productsData
    });

    const currentCached = await redis.get(CACHE_KEY);
    let updatedList: ProductsModel[] = [];

    if (currentCached) {
      updatedList = JSON.parse(currentCached).map((p: ProductsModel) =>
        p.id === id ? updated : p
      );
    }

    await this.updateCacheIfExistsWith(updatedList);

    return updated;
  }


  async addProducts(params: AddProductsRepository.Parameter): Promise<ProductsModel> {
    const created = await prisma.products.create({ data: params.productsData });

    const currentCached = await redis.get(CACHE_KEY);
    const currentProducts = currentCached ? JSON.parse(currentCached) as ProductsModel[] : [];

    const updatedList = [...currentProducts, created];
    await this.updateCacheIfExistsWith(updatedList);

    return created;
  }
}
