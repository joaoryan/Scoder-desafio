import { PrismaClient } from '../generated/prisma'
import {
  AddProdutcsRepository,
  DeleteProductsRepository,
  LoadProductsRepository,
  UpadateProductsRepository
} from '../data/protocols';
import { ProdutcsModel } from '../domain/models/produtcs';
import { emitProductUpdate } from './websocket/socket-emitter';

const prisma = new PrismaClient();

export class ProdutcsRepository
  implements AddProdutcsRepository, LoadProductsRepository, DeleteProductsRepository, UpadateProductsRepository {
  async loadProdutcs(): Promise<ProdutcsModel[] | null> {
    const products = await prisma.products.findMany();
    emitProductUpdate(products);
    return products;
  }

  async deleteProducts(params: DeleteProductsRepository.Parameter): Promise<boolean> {
    try {
      await prisma.products.delete({
        where: {
          id: Number(params.id)
        }
      });
      const products = await prisma.products.findMany();
      emitProductUpdate(products);
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

    const products = await prisma.products.findMany();
    emitProductUpdate(products);

    return updated;
  }

  async addProdutcs(params: AddProdutcsRepository.Parameter): Promise<ProdutcsModel> {
    const created = await prisma.products.create({
      data: params.produtcsData
    });

    const products = await prisma.products.findMany();
    emitProductUpdate(products);

    return created;
  }
}
