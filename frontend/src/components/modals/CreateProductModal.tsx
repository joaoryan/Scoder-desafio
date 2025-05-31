"use client";

import { ProductsModel } from "@/models/produtcs";
import { produtoService } from "@/services/produtoService";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProdutoModal({ isOpen, onClose }: Props) {
    const [form, setForm] = useState<ProductsModel>({
        name: "",
        category: "",
        price: "0,00",
        description: "",
        stock: 0,
    });

    const [errors, setErrors] = useState({
        name: false,
        category: false,
        price: false,
        description: false,
        stock: false,
    });

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors = {
            name: form.name.trim() === "",
            category: form.category.trim() === "",
            price: form.price.trim() === "",
            description: form.description?.trim() === "",
            stock: form.stock < 0,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleCadastrar = async (produto: ProductsModel) => {
        if (!validateForm()) {
            toast.error("Por favor, preencha todos os campos corretamente.");
            return;
        }

        try {
            const produtoFormatado = {
                ...produto,
                price: produto.price.toString().replace(',', '.'),
            };
            await produtoService.createProduct(produtoFormatado);
            toast.success("Produto cadastrado com sucesso!");
            onClose();
            setForm({
                name: "",
                category: "",
                price: "",
                description: "",
                stock: 0,
            });
            setErrors({
                name: false,
                category: false,
                price: false,
                description: false,
                stock: false,
            });
        } catch (error) {
            toast.error("Erro ao cadastrar produto. Tente novamente.");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === "stock" ? Number(value) : value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Cadastrar Produto</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full p-2 border mb-3 rounded ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300"
                            }`}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Categoria"
                        value={form.category}
                        onChange={handleChange}
                        className={`w-full p-2 border mb-3 rounded ${errors.category ? "border-red-400 bg-red-50" : "border-gray-300"
                            }`}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Preço (ex: 23,50)"
                        value={form.price}
                        onChange={handleChange}
                        className={`w-full p-2 border mb-3 rounded ${errors.price ? "border-red-400 bg-red-50" : "border-gray-300"
                            }`}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descrição"
                        value={form.description}
                        onChange={handleChange}
                        className={`w-full p-2 border mb-3 rounded ${errors.description ? "border-red-400 bg-red-50" : "border-gray-300"
                            }`}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Estoque"
                        value={form.stock}
                        onChange={handleChange}
                        className={`w-full p-2 border mb-4 rounded ${errors.stock ? "border-red-400 bg-red-50" : "border-gray-300"
                            }`}
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
                            onClick={() => handleCadastrar(form)}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
