import { DbAddProducts } from '../../../../data/usecases';
import type { AddProducts } from '../../../../domain/usecases';
import { ProductsRepository } from '../../../../infra';

export const makeAddProducts = (): AddProducts => {
  const repository = new ProductsRepository();
  return new DbAddProducts(repository);
};
