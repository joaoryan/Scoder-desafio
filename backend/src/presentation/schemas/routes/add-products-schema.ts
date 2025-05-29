import { z } from 'zod';
import { ErrorSchema, AddProductsSchema } from '../models';

export const addProductsSchema = {
  body: AddProductsSchema,
  response: {
    200: z.object({}),
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
