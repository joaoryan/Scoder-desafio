import { ProdutcsModel } from '../../domain/models/produtcs';

export interface AddProdutcsRepository {
  addProdutcs(params: AddProdutcsRepository.Parameter): Promise<ProdutcsModel>;
};

export namespace AddProdutcsRepository {
  export type Parameter = {
    produtcsData: ProdutcsModel
  };
};
