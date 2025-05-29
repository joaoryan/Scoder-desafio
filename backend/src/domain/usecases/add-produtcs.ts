import { ProdutcsModel } from '../models/produtcs';

export interface AddProdutcs {
  add(params: { produtcsData: ProdutcsModel }): Promise<ProdutcsModel>;
};

export namespace AddProdutcs {
  export type Request = {
    body: ProdutcsModel
  };
};
