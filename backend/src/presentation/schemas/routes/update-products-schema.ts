import { z } from 'zod';
import { ErrorSchema, UpdateProductsSchema } from '../models';

export const updateProductsSchema = {
  body: UpdateProductsSchema,
  response: {
    200: z.object({}),
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
