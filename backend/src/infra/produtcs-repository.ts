import { AddProdutcsRepository, DeleteProductsRepository, LoadProductsRepository, UpadateProductsRepository } from '../data/protocols';
import { ProdutcsModel } from '../domain/models/produtcs';

export class ProdutcsRepository implements AddProdutcsRepository, LoadProductsRepository, DeleteProductsRepository, UpadateProductsRepository {
  async loadProdutcs(): Promise<ProdutcsModel[] | null> {
    return await null
  }

  async deleteProducts(params: DeleteProductsRepository.Parameter): Promise<boolean> {
    return await true
  }

  async updateProducts(params: UpadateProductsRepository.Parameter): Promise<ProdutcsModel> {
    return await params.produtcsData
  }

  async addProdutcs(params: AddProdutcsRepository.Parameter): Promise<ProdutcsModel> {
    return await params.produtcsData
  }
};