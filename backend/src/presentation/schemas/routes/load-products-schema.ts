import { AddProductsSchema, ErrorSchema } from '../models';

export const loadProductsSchema = {
  response: {
    200: AddProductsSchema.array(),
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
