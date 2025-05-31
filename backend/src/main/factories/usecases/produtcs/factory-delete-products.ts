import { DbDeleteProducts } from '../../../../data/usecases';
import { DeleteProducts } from '../../../../domain/usecases';
import { ProductsRepository } from '../../../../infra';

export const makeDeleteProducts = (): DeleteProducts => {
  const repository = new ProductsRepository();
  return new DbDeleteProducts(repository);
};
