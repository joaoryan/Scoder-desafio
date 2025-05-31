"use client";

import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";

interface Props {
    produto: ProductsModel | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeletarProdutoModal({ produto, isOpen, onClose }: Props) {
    if (!isOpen || !produto) return null;

    async function handleDelete() {
        await produtoService.deleteProduct(produto?.id ?? 1)
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-xl shadow-lg"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
                <p className="mb-6">Tem certeza que deseja deletar o produto <strong>{produto.name}</strong>?</p>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded border">
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
