import type {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols';
import type { Request, Response } from 'express';

export const adptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    try {
      const adaptedRequest: HttpRequest = {
        body: request.body,
        query: request.query,
        params: request.params,
        headers: request.headers,
      };

      const controllerResponse: HttpResponse = await controller.handle(adaptedRequest);

      sendResponse(response, controllerResponse);
    } catch (error) {
      console.error('[adaptRoute] Unexpected error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  };
};

const sendResponse = (response: Response, { statusCode, body }: HttpResponse) => {
  const responseHandler = response.status(statusCode);

  if (statusCode >= 200 && statusCode <= 299) {
    responseHandler.json(body);
  } else {
    responseHandler.json({ error: body?.message || 'Unknown error' });
  }
};
