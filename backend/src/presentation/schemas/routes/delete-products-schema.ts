import { z } from 'zod';
import { ErrorSchema } from '../models';

export const deleteProductsSchema = {
  params: z.object({
    id: z.string()
  }),
  response: {
    200: z.object({}),
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
