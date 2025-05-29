import { type Request, type Response, type NextFunction, response } from 'express';
import { ZodSchema } from 'zod';

type ValidationSchemas = {
  body?: ZodSchema<any>;
  params?: ZodSchema<any>;
};

export const validationMiddleware = (schemas: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.params) req.params = schemas.params.parse(req.params);

      next();
    } catch (error: any) {
      return res.status(400).json({ error: error.errors });
    }
  };
};
