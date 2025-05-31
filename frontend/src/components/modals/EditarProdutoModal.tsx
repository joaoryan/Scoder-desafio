"use client";

import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import { useState, useEffect } from "react";

interface Props {
    produto: ProductsModel | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditarProdutoModal({ produto, isOpen, onClose }: Props) {
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque, setEstoque] = useState(0);

    useEffect(() => {
        if (produto) {
            setNome(produto.name ?? "");
            setCategoria(produto.category ?? "");
            setPreco(produto.price?.toString().replace(".", ",") ?? "");
            setDescricao(produto.description ?? "");
            setEstoque(produto.stock ?? 0);
        }
    }, [produto]);

    if (!isOpen || !produto) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await produtoService.updateProduct({
            id: produto?.id,
            productsData: {
                name: nome,
                price: preco.replace(",", "."),
                category: categoria,
                description: descricao,
                stock: estoque,
            },
        });

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

                <label className="block mb-2">
                    Nome:
                    <input
                        className="w-full border p-2 rounded"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>

                <label className="block mb-2">
                    Categoria:
                    <input
                        className="w-full border p-2 rounded"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </label>

                <label className="block mb-2">
                    Preço:
                    <input
                        type="text"
                        inputMode="decimal"
                        className="w-full border p-2 rounded"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </label>

                <label className="block mb-2">
                    Descrição:
                    <textarea
                        className="w-full border p-2 rounded"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={3}
                    />
                </label>

                <label className="block mb-4">
                    Estoque:
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={estoque}
                        onChange={(e) => setEstoque(Number(e.target.value))}
                        min={0}
                    />
                </label>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
                        Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
