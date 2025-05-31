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
        <div
            className="fixed inset-0 bg-[#282262]/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-[#3B328E] p-6 rounded-xl shadow-lg w-full max-w-md text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

                <label className="block mb-3 text-[#CCCCCC]">
                    Nome:
                    <input
                        className="w-full border border-[#7045FF] bg-[#282262] p-2 rounded mt-1 text-white placeholder:text-[#CCCCCC]"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome do produto"
                        required
                    />
                </label>

                <label className="block mb-3 text-[#CCCCCC]">
                    Categoria:
                    <input
                        className="w-full border border-[#7045FF] bg-[#282262] p-2 rounded mt-1 text-white placeholder:text-[#CCCCCC]"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Categoria do produto"
                        required
                    />
                </label>
                <div className="flex gap-4 mb-5">
                    <label className="flex-1 text-[#CCCCCC]">
                        Preço:
                        <input
                            type="text"
                            inputMode="decimal"
                            className="w-full border border-[#7045FF] bg-[#282262] p-2 rounded mt-1 text-white placeholder:text-[#CCCCCC]"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            placeholder="Ex: 23,50"
                            required
                        />
                    </label>

                    <label className="flex-1 text-[#CCCCCC]">
                        Estoque:
                        <input
                            type="number"
                            min={0}
                            className="w-full border border-[#7045FF] bg-[#282262] p-2 rounded mt-1 text-white placeholder:text-[#CCCCCC]"
                            value={estoque}
                            onChange={(e) => setEstoque(Number(e.target.value))}
                            placeholder="Qtd"
                        />
                    </label>
                </div>

                <label className="block mb-3 text-[#CCCCCC]">
                    Descrição:
                    <textarea
                        className="w-full border border-[#7045FF] bg-[#282262] p-2 rounded mt-1 text-white placeholder:text-[#CCCCCC]"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={3}
                        placeholder="Descrição do produto"
                    />
                </label>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-[#080525] text-white  hover:border-white border-2 border-transparent hover:shadow-lg transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#7045FF] text-white rounded  hover:border-white border-2 border-transparent hover:shadow-lg transition"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
