import { ProdutcsModel } from '../models/produtcs';

export interface LoadProducts {
  load(): Promise<ProdutcsModel[] | null>;
};


