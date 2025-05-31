"use client";

import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import { useState } from "react";



interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProdutoModal({ isOpen, onClose }: Props) {
    const [form, setForm] = useState<ProductsModel>({
        name: "",
        category: "",
        price: 0,
    });

    if (!isOpen) return null;

    const handleCadastrar = async (produto: ProductsModel) => {
        await produtoService.createProduct(produto)
        onClose()
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Cadastrar Produto</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border mb-3 rounded"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Categoria"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-2 border mb-3 rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-2 border mb-4 rounded"
                />

                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                            handleCadastrar(form);
                        }}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
