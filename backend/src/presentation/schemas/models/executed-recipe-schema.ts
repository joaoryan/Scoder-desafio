import { z } from 'zod';

export const AddProductsSchema = z.object({
  id: z
    .number()
    .nullish(),
  name: z
    .string(),
  description: z
    .string(),
  price: z
    .number(),
  image: z
    .string(),
  creationDate: z
    .coerce.date(),
  lastupdateDate: z
    .coerce.date(),
});