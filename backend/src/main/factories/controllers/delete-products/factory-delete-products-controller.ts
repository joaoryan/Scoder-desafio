import type { Controller } from '../../../../presentation/protocols';
import { DeleteProductsController } from '../../../../presentation/controller/delete-products';
import { makeDeleteProducts } from '../../usecases';

export const makeDeleteProductsController = (): Controller => {
  return new DeleteProductsController(makeDeleteProducts());
};