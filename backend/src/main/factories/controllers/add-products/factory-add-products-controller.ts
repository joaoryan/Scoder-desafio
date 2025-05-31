import type { Controller } from '../../../../presentation/protocols';
import { AddProductsController } from '../../../../presentation/controller';
import { makeAddProducts } from '../../usecases';

export const makeAddProductsController = (): Controller => {
  return new AddProductsController(makeAddProducts());
};