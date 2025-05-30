import { DbAddProdutcs } from '../../../../data/usecases';
import type { AddProdutcs } from '../../../../domain/usecases';
import { ProdutcsRepository } from '../../../../infra';

export const makeAddProdutcs = (): AddProdutcs => {
  const repository = new ProdutcsRepository();
  return new DbAddProdutcs(repository);
};
