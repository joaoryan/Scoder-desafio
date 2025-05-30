import type { Controller } from '../../../../presentation/protocols';
import { UpdateProdutcsController } from '../../../../presentation/controller';
import { makeUpdateProdutcs } from '../../usecases/produtcs/factory-update-produtcs';

export const makeUpdateProdutcsController = (): Controller => {
  return new UpdateProdutcsController(makeUpdateProdutcs());
};