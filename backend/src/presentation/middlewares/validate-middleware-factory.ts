import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { formatZodErrors } from '../../utils';

type ValidationSchemas = {
  body?: ZodSchema<any>;
  params?: ZodSchema<any>;
  response?: Record<number, ZodSchema<any>>;
};

export const validationMiddleware = (schemas: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.params) req.params = schemas.params.parse(req.params);

      const originalJson = res.json.bind(res);
      res.json = (data) => {
        const statusCode = res.statusCode;
        const responseSchema = schemas.response?.[statusCode];

        if (responseSchema) {
          try {
            data = responseSchema.parse(data);
          } catch (error: any) {
            console.error('[validationMiddleware] Response validation error:', error.errors);
            res.status(500);
            return originalJson({ error: 'Internal response validation error' });
          }
        }

        return originalJson(data);
      };

      next();
    } catch (error: any) {
      console.error('[validationMiddleware] Request validation error:', error.errors);

      const formattedErrors = formatZodErrors(error.errors);

      res.status(400).json({ 
        error: 'Validation error',
        details: formattedErrors
      });
    }
  };
};