"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import { ShoppingCart } from "lucide-react";
import CompraModal from "../../components/modals/PurchaseModal";
import Image from 'next/image';
import suricatostore from "@/img/suricatostore.png";
import { formatCurrencyBR } from "@/utils/formatCurrency";
import { getSocket } from "@/lib/socket";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function PaginaDeVendas() {
    const [produtos, setProdutos] = useState<ProductsModel[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProductsModel | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const socket = getSocket();

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

        return () => {
            socket.off("products:update", handleProductsUpdate);
        };
    }, []);

    const produtosFiltrados = produtos.filter((produto) => {
        const termo = termoBusca.toLowerCase();
        return (
            produto.name.toLowerCase().includes(termo) ||
            produto.category.toLowerCase().includes(termo)
        );
    });


    const produtosPorCategoria = produtosFiltrados.reduce((acc, produto) => {
        if (!acc[produto.category]) acc[produto.category] = [];
        acc[produto.category].push(produto);
        return acc;
    }, {} as Record<string, ProductsModel[]>);

    return (
        <div className="p-4 bg-[#282262] text-white min-h-screen">
            <h1 className="text-2xl font-bold mr-3">Vendas</h1>

            <div className="flex flex-col md:flex-row md:items-start bg-[#3B328E] px-6 pt-6 pb-0 rounded-xl mb-10 gap-6">
                <div className="md:flex-1">
                    <h2 className="text-xl font-semibold mb-2">Sobre a SuriStore</h2>
                    <p className="text-[#CCCCCC]">
                        A SuriStore é a sua loja online confiável, oferecendo os melhores produtos
                        com qualidade garantida e preços competitivos. Nosso compromisso é a satisfação
                        total do cliente, proporcionando uma experiência de compra fácil, segura e rápida.
                        Explore nossas categorias e encontre tudo que você precisa com praticidade e confiança.
                    </p>
                </div>
                <div className="md:flex-1 flex justify-center">
                    <Image
                        src={suricatostore}
                        alt="Ícone de vendas"
                        className="w-50 h-50"
                    />
                </div>
            </div>

            {loading ? (
                <div className="w-full  min-h-[472px] h-full flex items-center justify-center">
                    <LoadingSpinner text={"Carregando informações do produto..."} imageSize={200} size={100} />
                </div>
            )
                :
                <>
                    < div className="my-4 relative w-full md:w-1/2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar produto por nome ou categoria"
                            className="border-[#7045FF] bg-[#3B328E] text-white w-full pl-10 pr-4 py-2  rounded mt-1 placeholder:text-[#CCCCCC]"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>

                    {
                        Object.entries(produtosPorCategoria).map(([categoria, itens]) => (
                            <div key={categoria} className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 text-white">{categoria}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {itens.map((produto) => {
                                        const temEstoque = (produto.stock ?? 0) > 0;

                                        return (
                                            <div
                                                key={produto.id}
                                                className="bg-[#3B328E] rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col"
                                            >
                                                <h3 className="text-lg font-medium font-semibold text-[#7045FF]">{produto.name}</h3>
                                                {produto.description && (
                                                    <p className="text-[#FFFFFF] mb-2 text-sm line-clamp-2">
                                                        {produto.description}
                                                    </p>
                                                )}
                                                <p className="text-[#FFFFFF] mb-1">
                                                    Preço: R$ {formatCurrencyBR(produto.price)}
                                                </p>
                                                <p className={`mb-4 text-sm ${temEstoque ? 'text-[#FFFFFF]' : 'text-[#AAAAAA]'}`}>
                                                    Estoque: {produto.stock ?? 0}
                                                </p>
                                                <button
                                                    className={`mt-auto self-end p-2 rounded-full transition-colors 
                                            ${temEstoque
                                                            ? "bg-[#7045FF] hover:bg-[#5a35cc] cursor-pointer"
                                                            : "bg-gray-600 cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        if (!temEstoque) return;
                                                        setProdutoSelecionado(produto);
                                                        setModalAberto(true);
                                                    }}
                                                    aria-label={temEstoque ? `Comprar ${produto.name}` : `${produto.name} sem estoque`}
                                                    disabled={!temEstoque}
                                                >
                                                    <ShoppingCart
                                                        size={20}
                                                        color={temEstoque ? "#FFFFFF" : "#AAAAAA"}
                                                    />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    }

                </>
            }

            <CompraModal
                produto={produtoSelecionado}
                isOpen={modalAberto}
                onClose={() => {
                    setModalAberto(false);
                    setProdutoSelecionado(null);
                }}
            />
        </div >
    );
}
