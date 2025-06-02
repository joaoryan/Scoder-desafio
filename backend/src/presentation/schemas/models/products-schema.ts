import { z } from "zod";

export const ProductsSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  price: z.any(),
  category: z.string(),
  description: z.string().optional().nullable(),
  sales: z.number().optional().default(0),
  stock: z.number().optional().default(0),
  creationDate: z.coerce.date().optional(),
  lastupdateDate: z.coerce.date().optional(),
});

export const UpdateProductsSchema = z.object({
  id: z.number(),
  productsData: z.object({
    name: z.string(),
    price: z
      .string(),
    category: z.string(),
    description: z.string().optional().nullable(),
    sales: z.number().optional(),
    stock: z.number().optional(),
    creationDate: z.coerce.date().optional(),
    lastupdateDate: z.coerce.date().optional(),
  }),
});
