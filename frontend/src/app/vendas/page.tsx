// app/vendas/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import { ShoppingCart } from "lucide-react";
import CompraModal from "../../components/modals/PurchaseModal";
import Image from 'next/image';
import suricatostore from "@/img/suricatostore.png";

export default function PaginaDeVendas() {
    const [produtos, setProdutos] = useState<ProductsModel[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProductsModel | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    // Carregar produtos (useEffect para evitar execução em loop)
    useEffect(() => {
        async function fetchProdutos() {
            const result = await produtoService.loadProduct();
            setProdutos(result);
        }
        fetchProdutos();
    }, []);

    // Agrupar produtos por categoria
    const produtosPorCategoria = produtos.reduce((acc, produto) => {
        if (!acc[produto.category]) acc[produto.category] = [];
        acc[produto.category].push(produto);
        return acc;
    }, {} as Record<string, ProductsModel[]>);

    return (
        <div className="p-4 bg-[#282262] text-white min-h-screen">
            <h1 className="text-2xl font-bold mr-3">Vendas</h1>
            {/* Sobre a loja SuriStore */}
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

            {/* Lista de produtos agrupados por categoria */}
            {Object.entries(produtosPorCategoria).map(([categoria, itens]) => (
                <div key={categoria} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-white">{categoria}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {itens.map((produto) => (
                            <div
                                key={produto.id}
                                className="bg-[#3B328E] rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col"
                            >
                                <h3 className="text-lg font-medium text-white">{produto.name}</h3>
                                <p className="text-[#CCCCCC] mb-2">R$ {produto.price}</p>
                                <button
                                    className="mt-auto self-end p-2 bg-[#7045FF] hover:bg-[#5a35cc] rounded-full transition-colors"
                                    onClick={() => {
                                        setProdutoSelecionado(produto);
                                        setModalAberto(true);
                                    }}
                                    aria-label={`Comprar ${produto.name}`}
                                >
                                    <ShoppingCart size={20} color="#FFFFFF" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <CompraModal
                produto={produtoSelecionado}
                isOpen={modalAberto}
                onClose={() => {
                    setModalAberto(false);
                    setProdutoSelecionado(null);
                }}
            />
        </div>
    );
}
