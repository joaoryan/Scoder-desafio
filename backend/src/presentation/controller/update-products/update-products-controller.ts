import type { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { serverError, ok, responseError } from '../../helpers';
import { ServerError } from '../../errors';
import type { UpdateProducts } from '../../../domain/usecases';

export class UpdateProductsController implements Controller {
  private readonly updateProducts: UpdateProducts;

  constructor(updateProducts: UpdateProducts) {
    this.updateProducts = updateProducts
  };

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    console.log(httpRequest.body)
    try {
      const { id, productsData } = httpRequest.body;

      const requestResult = await this.updateProducts.update({ id: id, productsData: productsData });

      if (!requestResult || requestResult === null) {
        return responseError(400, 'Error update products');
      };

      return ok(requestResult);
    } catch (error: any) {
      console.log(error)
      return serverError(new ServerError(error.stack));
    }
  };
};