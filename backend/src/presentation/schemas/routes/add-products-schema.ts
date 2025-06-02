import { ErrorSchema, ProductsSchema } from '../models';

export const addProductsSchema = {
  body: ProductsSchema,
  response: {
    200: ProductsSchema,
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
