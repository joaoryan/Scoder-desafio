import type { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { serverError, ok, responseError } from '../../helpers';
import { ServerError } from '../../errors';
import type { AddProdutcs } from '../../../domain/usecases';

export class AddProdutcsController implements Controller {
  private readonly addProdutcs: AddProdutcs;

  constructor(addProdutcs: AddProdutcs) {
    this.addProdutcs = addProdutcs
  };

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = httpRequest.body;

      const requestResult = await this.addProdutcs.add({ produtcsData: data });

      if (!requestResult || requestResult === null) {
        return responseError(400, 'Error adding produtcs');
      };

      return ok({});
    } catch (error: any) {
      return serverError(new ServerError(error.stack));
    }
  };
};