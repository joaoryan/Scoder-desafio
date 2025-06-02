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

export type UpdateProductsModel = {
  id: number,
  productsData: {
    name: string,
    price: string,
    category: string,
    description: string,
    stock: number,
    sales?: number
  },
}