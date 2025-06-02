"use client";

import { produtoService } from "@/services/produtoService";
import { useEffect, useState } from "react";
import ProdutoModal from "@/components/modals/CreateProductModal";
import EditarProdutoModal from "@/components/modals/EditarProdutoModal";
import DeletarProdutoModal from "@/components/modals/DeletarProdutoModal";
import { ProductsModel } from "@/models/produtcs";
import { getSocket } from "@/lib/socket";
import ProductTable from "@/components/home/ProductTable";
import ProductAnalytics from "@/components/home/ProductAnalytics";
import ProductSummaryCards from "@/components/home/ProductSummaryCards";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface CategoriaResumo {
  categoria: string;
  quantidade: number;
}



export default function Home() {
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<ProductsModel[]>([]);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);
  const [produtoEditar, setProdutoEditar] = useState<ProductsModel | null>(null);
  const [produtoDeletar, setProdutoDeletar] = useState<ProductsModel | null>(null);

  useEffect(() => {
    let socket = getSocket();

    const carregarProdutos = async () => {
      try {
        const result = await produtoService.loadProduct();
        setProdutos(result);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleProductsUpdate = (data: ProductsModel[]) => {
      setProdutos(data);
    };

    socket.on("products:update", handleProductsUpdate);
    carregarProdutos();

    // Cleanup na desmontagem do componente
    return () => {
      socket.off("products:update", handleProductsUpdate);
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

      {loading ? (
        <div className="w-full  min-h-[472px] h-full flex items-center justify-center">
          <LoadingSpinner text={"Carregando informações do produto..."} imageSize={200} size={100} />
        </div>
      )
        :
        <>
          <ProductSummaryCards produtos={produtos} />

          <ProductTable
            produtos={produtos}
            onEdit={setProdutoEditar}
            onDelete={setProdutoDeletar}
          />

          <ProductAnalytics produtos={produtos} />


          <ProdutoModal isOpen={modalCadastrarAberto} onClose={() => setModalCadastrarAberto(false)} />
        </>
      }



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
