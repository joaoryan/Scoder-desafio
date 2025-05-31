import type { Controller } from '../../../../presentation/protocols';
import { LoadProductsController } from '../../../../presentation/controller/load-products';
import { makeLoadProducts } from '../../usecases';

export const makeLoadProductsController = (): Controller => {
  return new LoadProductsController(makeLoadProducts());
};