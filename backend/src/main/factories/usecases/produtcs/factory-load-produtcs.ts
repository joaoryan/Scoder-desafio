import { DbLoadProdutcs } from '../../../../data/usecases/load-produtcs';
import type { LoadProducts } from '../../../../domain/usecases';
import { ProdutcsRepository } from '../../../../infra';

export const makeLoadProdutcs = (): LoadProducts => {
  const repository = new ProdutcsRepository();
  return new DbLoadProdutcs(repository);
};
