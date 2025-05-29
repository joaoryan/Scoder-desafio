import type { Controller } from '../../../../presentation/protocols';
import { AddProdutcsController } from '../../../../presentation/controller';
import { makeAddProdutcs } from '../../usecases';

export const makeAddProdutcsController = (): Controller => {
  return new AddProdutcsController(makeAddProdutcs());
};