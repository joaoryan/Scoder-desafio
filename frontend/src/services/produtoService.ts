import { ProductsModel } from "@/models/produtcs";
import axios from "axios";


const API_URL = "http://localhost:5050";

export const produtoService = {
    async loadProduct(): Promise<ProductsModel[]> {
        const response = await axios.get<ProductsModel[]>(`${API_URL}/load/products`);
        return response.data;
    },

    async createProduct(produto: any): Promise<ProductsModel[]> {
        const response = await axios.post<any>(`${API_URL}/create/products`, produto);
        return response.data;
    },

    async updateProduct(produto: any): Promise<ProductsModel[]> {
        const response = await axios.put<any>(`${API_URL}/update/products`, produto);
        return response.data;
    },

    async deleteProduct(id: number): Promise<ProductsModel[]> {
        const response = await axios.delete<any>(`${API_URL}/delete/products/${id}`);
        return response.data;
    },
};
