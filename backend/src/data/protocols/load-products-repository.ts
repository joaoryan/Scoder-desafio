import { ProductsModel } from '../../domain/models/products';

export interface LoadProductsRepository {
  loadProducts(): Promise<ProductsModel[] | null>;
};
