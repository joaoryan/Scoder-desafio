import type { Controller } from '../../../../presentation/protocols';
import { UpdateProductsController } from '../../../../presentation/controller/update-products/update-products-controller';
import { makeUpdateProducts } from '../../usecases';

export const makeUpdateProductsController = (): Controller => {
  return new UpdateProductsController(makeUpdateProducts());
};