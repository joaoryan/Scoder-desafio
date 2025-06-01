"use client";

import { useState } from "react";

import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import toast from "react-hot-toast";

interface Props {
    produto: ProductsModel | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeletarProdutoModal({ produto, isOpen, onClose }: Props) {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !produto) return null;

    async function handleDelete() {
        setLoading(true)
        try {
            await produtoService.deleteProduct(produto?.id ?? 1);
            toast.success("Produto deletado com sucesso!")
            setLoading(false)
            onClose();
        } catch (error) {
            console.error(error)
            setLoading(false)
            toast.error("Erro ao deletar produto. Tente novamente.");
        }

    }

    return (
        <div
            className="fixed inset-0 bg-[#282262]/90 backdrop-blur-sm  flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#3B328E] p-6 rounded-xl shadow-lg min-h-[230px] max-w-md w-full text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? (
                    <div className="w-full  min-h-[230px] h-full flex items-center justify-center">
                        <LoadingSpinner size={60} />
                    </div>
                )
                    :
                    <>
                        <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
                        <p className="mb-6 text-[#CCCCCC]">
                            Tem certeza que deseja deletar o produto <strong className="text-white">{produto.name}</strong>?
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded border border-[#7045FF] bg-[#080525] text-white  hover:border-white border-2 border-transparent hover:shadow-lg transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-700 text-white rounded  hover:border-white border-2 border-transparent hover:shadow-lg transition cursor-pointer"
                            >
                                Deletar
                            </button>
                        </div>
                    </>
                }

            </div>
        </div>
    );
}
