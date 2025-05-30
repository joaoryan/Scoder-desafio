import type { AddProdutcs } from '../../../domain/usecases';
import type { AddProdutcsRepository } from '../../protocols';
import type { ProdutcsModel } from '../../../domain/models/produtcs';

export class DbAddProdutcs implements AddProdutcs {
  private readonly addProdutcsRepository: AddProdutcsRepository;

  constructor(addProdutcsRepository: AddProdutcsRepository) {
    this.addProdutcsRepository = addProdutcsRepository
  };

  async add(params: { produtcsData: ProdutcsModel }): Promise<ProdutcsModel> {
    const payload: ProdutcsModel = {
      ...params.produtcsData,
      creationDate: new Date(),
      lastupdateDate: new Date()
    };
    return await this.addProdutcsRepository.addProdutcs({ produtcsData: payload });
  };
};
