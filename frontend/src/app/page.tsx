"use client";

import { produtoService } from "@/services/produtoService";
import { useEffect, useState } from "react";
import ProdutoModal from "@/components/modals/CreateProductModal";
import ProdutoAcoes from "@/components/ProdutoAcoes";
import EditarProdutoModal from "@/components/modals/EditarProdutoModal";
import DeletarProdutoModal from "@/components/modals/DeletarProdutoModal";
import { ProductsModel } from "@/models/produtcs";
import { getSocket } from "@/lib/socket";

interface CategoriaResumo {
  categoria: string;
  quantidade: number;
}

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

      <ProdutoModal
        isOpen={modalCadastrarAberto}
        onClose={() => setModalCadastrarAberto(false)}
      />

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
        <div className="bg-white shadow-md rounded-xl p-4 flex justify-center items-center flex-col">
          <h2 className="text-xl font-semibold">Total de Produtos</h2>
          <p className="text-3xl font-bold" aria-live="polite">
            {produtos.length}
          </p>
        </div>

        {/* Card Horizontal com Categorias */}
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

      <section className="overflow-x-auto min-h-[400px]">
        <table className="min-w-full min-h-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Categoria</th>
              <th className="text-left p-3">Preço</th>
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
    </main>
  );
}
