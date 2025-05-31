"use client";

import { useState, useEffect } from "react";
import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";

interface Props {
    produto: ProductsModel | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CompraModal({ produto, isOpen, onClose }: Props) {
    const [quantidade, setQuantidade] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (produto) {
            setTotal(quantidade * Number(produto.price));
        }
    }, [quantidade, produto]);

    if (!isOpen || !produto) return null;

    const handleComprar = async () => {
        console.log(produto)
        console.log(quantidade)
        const novaQuantidadeVendida = (produto.sales ?? 0) + quantidade;
        const novoEstoque = (produto.stock ?? 0) - quantidade;

        if (novoEstoque < 0) {
            alert("Estoque insuficiente!");
            return;
        }

        try {
            await produtoService.updateProduct({
                id: produto?.id,
                productsData: {
                    ...produto,
                    sales: novaQuantidadeVendida,
                    stock: novoEstoque,
                },
            });

            alert(`Você comprou ${quantidade} unidade(s) de ${produto.name}`);
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            alert("Erro ao processar a compra.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Comprar {produto.name}
                </h2>

                <p className="text-gray-700 mb-2">
                    Preço unitário:{" "}
                    <span className="font-medium text-green-700">
                        R$ {produto.price}
                    </span>
                </p>

                <label className="block text-sm text-gray-600 mb-1" htmlFor="quantidade">
                    Quantidade:
                </label>
                <input
                    id="quantidade"
                    type="number"
                    min={1}
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <p className="text-gray-800 font-semibold mb-4">
                    Total a pagar:{" "}
                    <span className="text-green-700">R$ {total.toFixed(2)}</span>
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleComprar}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
