export type ProductsModel = {
  id?: number;
  name: string;
  category: string;
  price: string;
  description: string;
  sales?: number;
  stock: number;
  creationDate?: Date;
  lastupdateDate?: Date;
}