"use client";

import { useState, useEffect } from "react";
import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import toast from "react-hot-toast";
import LoadingSpinner from "../shared/LoadingSpinner";

interface Props {
    produto: ProductsModel | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CompraModal({ produto, isOpen, onClose }: Props) {
    const [loading, setLoading] = useState(false);
    const [quantidade, setQuantidade] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (produto) {
            setTotal(quantidade * Number(produto.price));
        }
    }, [quantidade, produto]);

    if (!isOpen || !produto) return null;

    const handleComprar = async () => {
        setLoading(true)
        const novaQuantidadeVendida = (produto.sales ?? 0) + quantidade;
        const novoEstoque = (produto.stock ?? 0) - quantidade;

        if (novoEstoque < 0) {
            alert("Estoque insuficiente!");
            return;
        }

        try {
            await produtoService.updateProduct({
                id: produto?.id ?? 0,
                productsData: {
                    ...produto,
                    sales: novaQuantidadeVendida,
                    stock: novoEstoque,
                },
            });
            setLoading(false)
            toast.success(`Você comprou ${quantidade} unidade(s) de ${produto.name}`)
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            toast.error("Erro ao processar a compra.")
            setLoading(false)
        }
    };

    return (
        <div
            className="fixed inset-0 bg-[#282262]/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#3B328E] p-6 rounded-xl shadow-lg min-h-[300px] w-full max-w-sm text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? (
                    <div className="w-full  min-h-[300px] h-full flex items-center justify-center">
                        <LoadingSpinner size={60} />
                    </div>
                )
                    :
                    <>
                        <h2 className="text-2xl font-semibold mb-4">{`Comprar ${produto.name}`}</h2>

                        <p className="text-[#CCCCCC] mb-2">
                            Preço unitário:{" "}
                            <span className="font-medium text-[#7EE787]">
                                R$ {produto.price}
                            </span>
                        </p>

                        <label
                            className="block text-sm text-[#CCCCCC] mb-1"
                            htmlFor="quantidade"
                        >
                            Quantidade:
                        </label>
                        <input
                            id="quantidade"
                            type="number"
                            min={1}
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            className="w-full p-2 border border-[#7045FF] rounded mb-4 bg-[#282262] text-white placeholder:text-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#7045FF]"
                        />

                        <p className="text-white font-semibold mb-4">
                            Total a pagar:{" "}
                            <span className="text-[#7EE787]">R$ {total.toFixed(2)}</span>
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-[#080525] border border-[#7045FF] text-white rounded  hover:border-white border-2 border-transparent hover:shadow-lg transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleComprar}
                                className="px-4 py-2 bg-[#7045FF] text-white rounded  hover:border-white border-2 border-transparent hover:shadow-lg transition cursor-pointer"
                            >
                                Confirmar
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
