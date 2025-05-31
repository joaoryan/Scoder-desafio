import { DbLoadProducts } from '../../../../data/usecases';
import type { LoadProducts } from '../../../../domain/usecases';
import { ProductsRepository } from '../../../../infra';

export const makeLoadProducts = (): LoadProducts => {
  const repository = new ProductsRepository();
  return new DbLoadProducts(repository);
};
