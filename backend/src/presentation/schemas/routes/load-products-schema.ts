import { z } from 'zod';
import { ErrorSchema } from '../models';

export const loadProductsSchema = {
  response: {
    200: z.object({}),
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
