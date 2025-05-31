import { ProductsModel } from '../../domain/models/products';

export interface AddProductsRepository {
  addProducts(params: AddProductsRepository.Parameter): Promise<ProductsModel>;
};

export namespace AddProductsRepository {
  export type Parameter = {
    productsData: ProductsModel
  };
};
