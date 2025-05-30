import type { Controller } from '../../../../presentation/protocols';
import { LoadProdutcsController } from '../../../../presentation/controller/load-produtcs';
import { makeLoadProdutcs } from '../../usecases/produtcs/factory-load-produtcs';

export const makeLoadProdutcsController = (): Controller => {
  return new LoadProdutcsController(makeLoadProdutcs());
};