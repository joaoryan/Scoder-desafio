import { ProdutcsModel } from "@/models/produtcs";
import axios from "axios";


const API_URL = "http://localhost:5050";

export const produtoService = {
    async loadProduct(): Promise<ProdutcsModel[]> {
        const response = await axios.get<ProdutcsModel[]>(`${API_URL}/load/products`);
        return response.data;
    },

    async createProduct(produto: any): Promise<ProdutcsModel[]> {
        const response = await axios.post<any>(`${API_URL}/create/products`, produto);
        return response.data;
    },

    async updateProduct(produto: any): Promise<ProdutcsModel[]> {
        const response = await axios.put<any>(`${API_URL}/update/products`, produto);
        return response.data;
    },

    async deleteProduct(id: number): Promise<ProdutcsModel[]> {
        const response = await axios.delete<any>(`${API_URL}/delete/products/${id}`);
        return response.data;
    },

    // Exemplo para outras operações do CRUD (caso adicione depois):
    // async criar(produto: Produto) { ... }
    // async atualizar(id: number, produto: Produto) { ... }
    // async remover(id: number) { ... }
};
