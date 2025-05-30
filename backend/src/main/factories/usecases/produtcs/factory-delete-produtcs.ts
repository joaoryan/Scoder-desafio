import { DbDeleteProdutcs } from '../../../../data/usecases/delete-produtcs';
import { DeleteProducts } from '../../../../domain/usecases/delete-products';
import { ProdutcsRepository } from '../../../../infra';

export const makeDeleteProdutcs = (): DeleteProducts => {
  const repository = new ProdutcsRepository();
  return new DbDeleteProdutcs(repository);
};
