import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { serverError, ok, responseError } from '../../helpers'
import { ServerError } from '../../errors'
import { DeleteProducts } from '../../../domain/usecases'

export class DeleteProductsController implements Controller {
  private readonly deleteProducts: DeleteProducts

  constructor(deleteProducts: DeleteProducts) {
    this.deleteProducts = deleteProducts
  };

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const requestResult = await this.deleteProducts.delete({ id: id })

      if (!requestResult || requestResult === null) {
        return responseError(400, 'Error adding products')
      };

      return ok({});
    } catch (error: any) {
      return serverError(new ServerError(error.stack))
    }
  };
};