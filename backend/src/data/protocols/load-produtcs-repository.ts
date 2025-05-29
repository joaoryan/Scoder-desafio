import { ProdutcsModel } from '../../domain/models/produtcs';

export interface LoadProductsRepository {
  loadProdutcs(): Promise<ProdutcsModel[] | null>;
};
