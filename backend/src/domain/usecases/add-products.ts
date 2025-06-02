import { ProductsModel } from '../models/products';

export interface AddProducts {
  add(params: { productsData: ProductsModel }): Promise<ProductsModel | null>;
};

export namespace AddProducts {
  export type Request = {
    body: ProductsModel
  };
};
