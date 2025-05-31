import { Decimal } from "../../../generated/prisma/runtime/library";

export type ProductsModel = {
  id?: number;
  name: string;
  category: string;
  price: string | Decimal;
  description: string | null;
  sales: number;
  stock: number;
  creationDate: Date;
  lastupdateDate: Date;
}