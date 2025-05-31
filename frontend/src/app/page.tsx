"use client";

import { produtoService } from "@/services/produtoService";
import { useEffect, useState } from "react";
import ProdutoModal from "@/components/modals/CreateProductModal";
import ProdutoAcoes from "@/components/ProdutoAcoes";
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
    const produtosComVendas = result.map((produto) => ({
      ...produto,
      sales: Math.floor(Math.random() * 100) + 1,
      stock: Math.floor(Math.random() * 100) + 1,
    }));
    setProdutos(produtosComVendas);

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
      const produtosComVendas = data.map((produto) => ({
        ...produto,
        sales: Math.floor(Math.random() * 100) + 1,
        stock: Math.floor(Math.random() * 100) + 1,
      }));
      setProdutos(produtosComVendas);

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
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">Gerenciador de Produtos</h1>
      </div>

      <div className="flex justify-end items-center mb-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <h2 className="text-xl font-semibold">Total de Produtos</h2>
          <p className="text-3xl font-bold" aria-live="polite">
            {produtos.length}
          </p>
        </div>

        <div className="md:col-span-2 bg-white shadow-md rounded-xl p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">Produtos por Categoria</h2>
          <div className="flex gap-6">
            {resumoCategorias.map((cat) => (
              <div
                key={cat.categoria}
                className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 min-w-[120px]"
              >
                <span className="text-md font-medium">{cat.categoria}</span>
                <span className="text-xl font-bold">{cat.quantidade}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-x-auto min-h-[400px] mb-10">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Categoria</th>
              <th className="text-left p-3">Preço</th>
              <th className="text-left p-3">Vendas</th>
              <th className="text-left p-3"></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-t">
                <td className="p-3">{produto.id}</td>
                <td className="p-3">{produto.name}</td>
                <td className="p-3">{produto.category}</td>
                <td className="p-3">R$ {produto.price}</td>
                <td className="p-3">{produto.sales ?? 0}</td>
                <td className="p-3">
                  <ProdutoAcoes
                    produto={produto}
                    onEdit={() => setProdutoEditar(produto)}
                    onDelete={() => setProdutoDeletar(produto)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Gráfico de Vendas */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Gráfico de Pizza */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Vendas por Produto</h2>
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras por Categoria */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Vendas por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosVendasCategoria}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" name="Total de Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Gráfico de Estoque vs Vendas */}
      <section className="bg-white shadow-md rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Estoque</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={produtos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Vendas" />
            <Bar dataKey="stock" fill="#82ca9d" name="Estoque" />
          </BarChart>
        </ResponsiveContainer>
      </section>

    </main>
  );
}
