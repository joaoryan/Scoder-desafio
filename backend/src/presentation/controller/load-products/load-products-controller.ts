import type { Controller, HttpResponse } from '../../protocols';
import { serverError, ok, noContent } from '../../helpers';
import { ServerError } from '../../errors';
import type { LoadProducts } from '../../../domain/usecases';

export class LoadProductsController implements Controller {
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

      return ok(requestResult);
    } catch (error: any) {
      return serverError(new ServerError(error.stack));
    }
  };
};