import axios from "axios";

export interface Produto {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
}

const API_URL = "http://localhost:5050";

export const produtoService = {
    async listarTodos(): Promise<Produto[]> {
        const response = await axios.get<Produto[]>(`${API_URL}/load/products`);
        return response.data;
    },

    // Exemplo para outras operações do CRUD (caso adicione depois):
    // async criar(produto: Produto) { ... }
    // async atualizar(id: number, produto: Produto) { ... }
    // async remover(id: number) { ... }
};
