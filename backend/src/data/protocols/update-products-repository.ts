import { ProductsModel } from '../../domain/models/products';

export interface UpadateProductsRepository {
  updateProducts(params: UpadateProductsRepository.Parameter): Promise<ProductsModel>;
};

export namespace UpadateProductsRepository {
  export type Parameter = {
    id: number,
    productsData: ProductsModel
  };
};
