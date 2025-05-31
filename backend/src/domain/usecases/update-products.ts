import { ProductsModel } from '../models/products';

export interface UpdateProducts {
  update(params: { id: number, productsData: ProductsModel }): Promise<ProductsModel | null>;
};

export namespace UpdateProducts {
  export type Request = {
    body: { id: number, productsData: ProductsModel }
  };
};
