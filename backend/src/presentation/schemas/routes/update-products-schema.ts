import { ProductsSchema, ErrorSchema, UpdateProductsSchema } from '../models';

export const updateProductsSchema = {
  body: UpdateProductsSchema,
  response: {
    200: ProductsSchema,
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
