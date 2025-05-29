import { AddProdutcsRepository } from '../data/protocols';
import { ProdutcsModel } from '../domain/models/produtcs';

export class ProdutcsRepository implements AddProdutcsRepository {

  async addProdutcs(params: AddProdutcsRepository.Parameter): Promise<ProdutcsModel> {
    return await params.produtcsData
  }
};