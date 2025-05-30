import { PrismaClient } from '../generated/prisma'
import {
  AddProdutcsRepository,
  DeleteProductsRepository,
  LoadProductsRepository,
  UpadateProductsRepository
} from '../data/protocols';
import { ProdutcsModel } from '../domain/models/produtcs';

const prisma = new PrismaClient();

export class ProdutcsRepository
  implements AddProdutcsRepository, LoadProductsRepository, DeleteProductsRepository, UpadateProductsRepository {
  async loadProdutcs(): Promise<ProdutcsModel[] | null> {
    const products = await prisma.products.findMany();
    return products;
  }

  async deleteProducts(params: DeleteProductsRepository.Parameter): Promise<boolean> {
    try {
      await prisma.products.delete({
        where: {
          id: Number(params.id)
        }
      });
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

    return updated;
  }

  async addProdutcs(params: AddProdutcsRepository.Parameter): Promise<ProdutcsModel> {
    const created = await prisma.products.create({
      data: params.produtcsData
    });

    return created;
  }
}
