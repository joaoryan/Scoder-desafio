import type { Controller } from '../../../../presentation/protocols';
import { DeleteProductsController } from '../../../../presentation/controller/delete-produtcs';
import { makeDeleteProdutcs } from '../../usecases/produtcs/factory-delete-produtcs';

export const makeDeleteProdutcsController = (): Controller => {
  return new DeleteProductsController(makeDeleteProdutcs());
};