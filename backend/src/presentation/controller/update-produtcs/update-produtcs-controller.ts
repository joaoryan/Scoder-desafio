import type { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { serverError, ok, responseError } from '../../helpers';
import { ServerError } from '../../errors';
import type { UpdateProdutcs } from '../../../domain/usecases';

export class UpdateProdutcsController implements Controller {
  private readonly updateProdutcs: UpdateProdutcs;

  constructor(updateProdutcs: UpdateProdutcs) {
    this.updateProdutcs = updateProdutcs
  };

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, produtcsData } = httpRequest.body.data;

      const requestResult = await this.updateProdutcs.update({ id: id, produtcsData: produtcsData });

      if (!requestResult || requestResult === null) {
        return responseError(400, 'Error update produtcs');
      };

      return ok(requestResult);
    } catch (error: any) {
      return serverError(new ServerError(error.stack));
    }
  };
};