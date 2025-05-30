"use client";

import { produtoService } from "@/services/produtoService";
import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
//import axios from "axios";

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

interface CategoriaResumo {
  categoria: string;
  quantidade: number;
}

//const socket = io("http://localhost:3000"); // ajuste para o seu backend

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [resumoCategorias, setResumoCategorias] = useState<CategoriaResumo[]>([]);



  const atualizarResumo = (produtos: Produto[]) => {
    const resumo = produtos.reduce<Record<string, number>>((acc, produto) => {
      acc[produto.categoria] = (acc[produto.categoria] || 0) + 1;
      return acc;
    }, {});

    const categorias = Object.entries(resumo).map(([categoria, quantidade]) => ({
      categoria,
      quantidade,
    }));

    setResumoCategorias(categorias);
  };

  useEffect(() => {
    async function fetchProdutos() {
      const data = await produtoService.listarTodos();
      setProdutos(data);
      console.log(data)
    }

    fetchProdutos();
  }, []);

  useEffect(() => {
    atualizarResumo(produtos);
  }, [produtos]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Gerenciador de Produtos</h1>

      <section className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">Total de Produtos</h2>
          <p className="text-3xl font-bold" aria-live="polite">{produtos.length}</p>
        </div>
        {resumoCategorias.map((cat) => (
          <div
            key={cat.categoria}
            className="bg-white shadow-md rounded-xl p-4"
            aria-label={`Categoria ${cat.categoria}`}
          >
            <h2 className="text-xl font-semibold">{cat.categoria}</h2>
            <p className="text-2xl font-bold" aria-live="polite">{cat.quantidade}</p>
          </div>
        ))}
      </section>

      <section className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Categoria</th>
              <th className="text-left p-3">Preço</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-t">
                <td className="p-3">{produto.id}</td>
                <td className="p-3">{produto.nome}</td>
                <td className="p-3">{produto.categoria}</td>
                <td className="p-3">R$ {produto.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}