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
import ProductTable from "@/components/shared/ProductTable";
import ProductAnalytics from "@/components/shared/ProductAnalytics";
import ProductSummaryCards from "@/components/shared/ProductSummaryCards";

interface CategoriaResumo {
  categoria: string;
  quantidade: number;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<ProductsModel[]>([]);
  const [resumoCategorias, setResumoCategorias] = useState<CategoriaResumo[]>([]);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);
  const [produtoEditar, setProdutoEditar] = useState<ProductsModel | null>(null);
  const [produtoDeletar, setProdutoDeletar] = useState<ProductsModel | null>(null);

  const carregarProdutos = async () => {
    const result = await produtoService.loadProduct();
    setProdutos(result);
    setLoading(false)
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
          className="px-4 py-2 bg-[#7045FF] text-white rounded hover:bg-[#3B328E] cursor-pointer"
          onClick={() => setModalCadastrarAberto(true)}
        >
          Cadastrar Produto
        </button>
      </div>

      <ProductSummaryCards produtos={produtos} resumoCategorias={resumoCategorias} />

      <ProductTable
        produtos={produtos}
        onEdit={setProdutoEditar}
        onDelete={setProdutoDeletar}
      />

      <ProductAnalytics produtos={produtos} />


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
    </main>
  );
}
