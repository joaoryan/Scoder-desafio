import { ProductsModel } from '../models/products';

export interface LoadProducts {
  load(): Promise<ProductsModel[] | null>;
};


