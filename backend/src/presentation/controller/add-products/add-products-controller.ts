import type { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { serverError, ok, responseError } from '../../helpers';
import { ServerError } from '../../errors';
import type { AddProducts } from '../../../domain/usecases';

export class AddProductsController implements Controller {
  private readonly addProducts: AddProducts;

  constructor(addProducts: AddProducts) {
    this.addProducts = addProducts
  };

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = httpRequest.body;

      const requestResult = await this.addProducts.add({ productsData: data });

      if (!requestResult || requestResult === null) {
        return responseError(400, 'Error adding products');
      };

      return ok({});
    } catch (error: any) {
      return serverError(new ServerError(error.stack));
    }
  };
};