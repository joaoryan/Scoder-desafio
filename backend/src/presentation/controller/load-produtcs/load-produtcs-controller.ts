import type { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { serverError, ok, responseError, noContent } from '../../helpers';
import { ServerError } from '../../errors';
import type { LoadProducts } from '../../../domain/usecases';

export class LoadProdutcsController implements Controller {
  private readonly loadProducts: LoadProducts;

  constructor(loadProducts: LoadProducts) {
    this.loadProducts = loadProducts
  };

  async handle(): Promise<HttpResponse> {
    try {

      const requestResult = await this.loadProducts.load();

      if (!requestResult || requestResult === null) {
        return noContent();
      };
      console.log(requestResult)
      return ok(requestResult);
    } catch (error: any) {
      return serverError(new ServerError(error.stack));
    }
  };
};