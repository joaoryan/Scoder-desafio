// app/vendas/page.tsx
"use client";

import { useState } from "react";
import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import { ShoppingCart } from "lucide-react";
import CompraModal from "../../components/modals/PurchaseModal";

export default function PaginaDeVendas() {
    const [produtos, setProdutos] = useState<ProductsModel[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProductsModel | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    // Carregar produtos (você pode ajustar conforme necessário com useEffect e API real)
    useState(async () => {
        const result = await produtoService.loadProduct();
        setProdutos(result);
    });

    // Agrupar produtos por categoria
    const produtosPorCategoria = produtos.reduce((acc, produto) => {
        if (!acc[produto.category]) acc[produto.category] = [];
        acc[produto.category].push(produto);
        return acc;
    }, {} as Record<string, ProductsModel[]>);

    return (
        <div className="p-4 bg-gray-50 p-4 text-gray-900">
            <h1 className="text-2xl font-bold mb-6">Vendas</h1>

            {Object.entries(produtosPorCategoria).map(([categoria, itens]) => (
                <div key={categoria} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{categoria}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {itens.map((produto) => (
                            <div
                                key={produto.id}
                                className="border rounded-xl p-4 shadow hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-medium">{produto.name}</h3>
                                <p className="text-gray-600 mb-2">R$ {produto.price}</p>
                                <button
                                    className="ml-auto mt-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                    onClick={() => {
                                        setProdutoSelecionado(produto);
                                        setModalAberto(true);
                                    }}
                                >
                                    <ShoppingCart size={20} />
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
