import { HttpResponse, Middleware } from '../../presentation/protocols';
import type { Request, Response, NextFunction } from 'express';

export const adptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers,
      params: req.params,
      body: req.body
    }

    const httpResponse: HttpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(req.body, httpResponse.body);
      next();
    } else {
      res
        .status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.message
        });
    }
  }
}