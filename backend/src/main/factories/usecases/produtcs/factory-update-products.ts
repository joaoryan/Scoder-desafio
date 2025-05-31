import { DbUpdateProducts } from '../../../../data/usecases';
import type { UpdateProducts } from '../../../../domain/usecases';
import { ProductsRepository } from '../../../../infra';

export const makeUpdateProducts = (): UpdateProducts => {
  const repository = new ProductsRepository();
  return new DbUpdateProducts(repository);
};
