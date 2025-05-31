"use client";

import { produtoService } from "@/services/produtoService";
import { useEffect, useState } from "react";
import ProdutoModal from "@/components/modals/CreateProductModal";
import EditarProdutoModal from "@/components/modals/EditarProdutoModal";
import DeletarProdutoModal from "@/components/modals/DeletarProdutoModal";
import { ProductsModel } from "@/models/produtcs";
import { getSocket } from "@/lib/socket";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Image from 'next/image';
import suricatostore from "@/img/suricato-gerente.png";


interface CategoriaResumo {
  categoria: string;
  quantidade: number;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

export default function Home() {
  const [produtos, setProdutos] = useState<ProductsModel[]>([]);
  const [resumoCategorias, setResumoCategorias] = useState<CategoriaResumo[]>([]);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);
  const [produtoEditar, setProdutoEditar] = useState<ProductsModel | null>(null);
  const [produtoDeletar, setProdutoDeletar] = useState<ProductsModel | null>(null);

  const carregarProdutos = async () => {
    const result = await produtoService.loadProduct();

    setProdutos(result);

    const resumo = result.reduce((acc: Record<string, number>, prod: ProductsModel) => {
      acc[prod.category] = (acc[prod.category] || 0) + 1;
      return acc;
    }, {});

    const categorias = Object.entries(resumo).map(([categoria, quantidade]) => ({
      categoria,
      quantidade,
    }));

    setResumoCategorias(categorias);
  };

  const vendasPorCategoria = produtos.reduce((acc: Record<string, number>, prod) => {
    acc[prod.category] = (acc[prod.category] || 0) + (prod.sales ?? 0);
    return acc;
  }, {});

  const dadosVendasCategoria = Object.entries(vendasPorCategoria).map(([categoria, total]) => ({
    categoria,
    total,
  }));

  useEffect(() => {
    carregarProdutos();

    const socket = getSocket();

    socket.on("products:update", (data: ProductsModel[]) => {

      setProdutos(data);

      const resumo = data.reduce((acc: Record<string, number>, prod) => {
        acc[prod.category] = (acc[prod.category] || 0) + 1;
        return acc;
      }, {});

      const categorias = Object.entries(resumo).map(([categoria, quantidade]) => ({
        categoria,
        quantidade,
      }));

      setResumoCategorias(categorias);
    });

    return () => {
      socket.off("products:update");
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#282262] p-4 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">SuriGestor de Produtos</h1>
      </div>

      <div className="flex justify-end items-center mb-6">
        <button
          className="px-4 py-2 bg-[#7045FF] text-white rounded hover:bg-[#3B328E]"
          onClick={() => setModalCadastrarAberto(true)}
        >
          Cadastrar Produto
        </button>
      </div>

      <ProdutoModal isOpen={modalCadastrarAberto} onClose={() => setModalCadastrarAberto(false)} />

      {produtoEditar && (
        <EditarProdutoModal
          produto={produtoEditar}
          isOpen={!!produtoEditar}
          onClose={() => setProdutoEditar(null)}
        />
      )}

      {produtoDeletar && (
        <DeletarProdutoModal
          produto={produtoDeletar}
          isOpen={!!produtoDeletar}
          onClose={() => setProdutoDeletar(null)}
        />
      )}

      <section className="grid gap-4 md:grid-cols-3 mb-6">
        {/* Card com imagem flutuante acima */}
        <div className="relative">
          {/* Imagem absoluta saindo do card */}
          <Image
            src={suricatostore}
            alt="Ícone flutuante"
            width={80}
            height={80}
            className="absolute -top-27 left-4 z-10"
          />

          <section className="bg-[#3B328E] shadow-md rounded-xl p-4 text-white flex min-h-[152px] w-full">
            {/* Lado esquerdo: total produtos */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-2 text-center">Total de Produtos</h2>
              <p className="text-3xl font-bold" aria-live="polite">
                {produtos.length}
              </p>
            </div>

            {/* Linha vertical separadora */}
            <div className="border-l border-[#7045FF] mx-4" />

            {/* Lado direito: ranking top 3 mais vendidos */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-2 text-center">Top 3 Produtos Mais Vendidos</h2>
              <ol className="list-decimal list-inside space-y-1 text-sm w-full max-w-[180px]">
                {produtos
                  .slice()
                  .sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0))
                  .slice(0, 3)
                  .map((produto) => (
                    <li key={produto.id} className="flex justify-between px-2">
                      <span className="truncate max-w-[70%]">{produto.name}</span>
                      <span className="font-semibold text-[#7045FF]">{produto.sales ?? 0}</span>
                    </li>
                  ))}
              </ol>
            </div>
          </section>
        </div>

        <div className="md:col-span-2 bg-[#3B328E] shadow-md rounded-xl p-4 overflow-x-auto min-h-[152px]">
          <h2 className="text-xl font-semibold mb-2">Produtos por Categoria</h2>
          <div className="flex gap-6">
            {resumoCategorias.map((cat) => (
              <div
                key={cat.categoria}
                className="flex flex-col items-center justify-center bg-[#282262] rounded-lg p-4 min-w-[120px]"
              >
                <span className="text-md font-medium">{cat.categoria}</span>
                <span className="text-xl font-bold">{cat.quantidade}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10 shadow-md rounded-xl bg-[#3B328E]">
        <div className="overflow-y-auto max-h-[360px]">
          <table className="min-w-full text-white">
            <thead className="bg-[#7045FF] sticky top-0 z-10">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Categoria</th>
                <th className="text-left p-3">Preço</th>
                <th className="text-left p-3">Vendas</th>
                <th className="text-left p-3"></th>
                <th className="text-left p-3"></th>
                <th className="text-left p-3"></th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-t border-gray-600 text-gray-300">
                  <td className="p-3">{produto.id}</td>
                  <td className="p-3">{produto.name}</td>
                  <td className="p-3">{produto.category}</td>
                  <td className="p-3">R$ {produto.price}</td>
                  <td className="p-3">{produto.sales ?? 0}</td>
                  <td className="p-3 flex justify-end gap-10">
                    <button onClick={() => setProdutoEditar(produto)} title="Clique para editar" className="text-blue-300 hover:text-blue-500">
                      ✏️
                    </button>
                    <button onClick={() => setProdutoDeletar(produto)} className="text-red-400 hover:text-red-600">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gráficos */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#3B328E] shadow-md rounded-xl p-6">
          <h2 className=" text-xl font-semibold mb-4">Vendas por Produto</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={produtos}
                dataKey="sales"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {produtos.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#3B328E] shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Vendas por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosVendasCategoria}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
              <XAxis dataKey="categoria" stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#7045FF" name="Total de Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-[#3B328E] shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Estoque</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={produtos}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Vendidos" />
            <Bar dataKey="stock" fill="#00C49F" name="Estoque atual" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}
