import { z } from 'zod';

export const AddProductsSchema = z.object({
  id: z
    .number()
    .nullish(),
  name: z
    .string(),
  price: z
    .number(),
  category: z
    .string(),
  creationDate: z
    .coerce.date().nullish(),
  lastupdateDate: z
    .coerce.date().nullish(),
})

export const UpdateProductsSchema = z.object({
  id: z.number(),
  productsData: z.object({
    name: z
      .string(),
    price: z
      .number(),
    category: z
      .string(),
    creationDate: z
      .coerce.date().nullish(),
    lastupdateDate: z
      .coerce.date().nullish()
  })
})