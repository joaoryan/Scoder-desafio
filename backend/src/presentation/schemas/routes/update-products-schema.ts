import { z } from 'zod';
import { AddProductsSchema, ErrorSchema, UpdateProductsSchema } from '../models';

export const updateProductsSchema = {
  body: UpdateProductsSchema,
  response: {
    200: AddProductsSchema,
    400: ErrorSchema,
    403: ErrorSchema,
    500: ErrorSchema,
  }
};
