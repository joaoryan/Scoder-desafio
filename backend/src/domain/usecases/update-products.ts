import { ProdutcsModel } from '../models/produtcs';

export interface UpdateProdutcs {
  update(params: { id: number, produtcsData: ProdutcsModel }): Promise<ProdutcsModel | null>;
};

export namespace UpdateProdutcs {
  export type Request = {
    body: { id: number, produtcsData: ProdutcsModel }
  };
};
