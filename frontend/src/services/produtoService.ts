import { ProductsModel, UpdateProductsModel } from "@/models/produtcs";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const produtoService = {
    async loadProduct(): Promise<ProductsModel[]> {
        const response = await axios.get<ProductsModel[]>(`${API_URL}/load/products`);
        return response.data;
    },

    async createProduct(produto: ProductsModel): Promise<ProductsModel[]> {
        const response = await axios.post(`${API_URL}/create/products`, produto);
        return response.data;
    },

    async updateProduct(produto: UpdateProductsModel): Promise<ProductsModel[]> {
        const response = await axios.put(`${API_URL}/update/products`, produto);
        return response.data;
    },

    async deleteProduct(id: number): Promise<ProductsModel[]> {
        const response = await axios.delete(`${API_URL}/delete/products/${id}`);
        return response.data;
    },
};
