import { ProdutcsModel } from '../../domain/models/produtcs';

export interface UpadateProductsRepository {
  updateProducts(params: UpadateProductsRepository.Parameter): Promise<ProdutcsModel>;
};

export namespace UpadateProductsRepository {
  export type Parameter = {
    id: number,
    produtcsData: ProdutcsModel
  };
};
