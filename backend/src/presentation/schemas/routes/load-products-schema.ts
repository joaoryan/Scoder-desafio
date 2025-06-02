import { ProductsSchema, ErrorSchema } from '../models';

export const loadProductsSchema = {
  response: {
    200: ProductsSchema.array(),
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
