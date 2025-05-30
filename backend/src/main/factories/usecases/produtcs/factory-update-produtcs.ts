import { DbUpdateProdutcs } from '../../../../data/usecases/update-produtcs';
import type { UpdateProdutcs } from '../../../../domain/usecases';
import { ProdutcsRepository } from '../../../../infra';

export const makeUpdateProdutcs = (): UpdateProdutcs => {
  const repository = new ProdutcsRepository();
  return new DbUpdateProdutcs(repository);
};
