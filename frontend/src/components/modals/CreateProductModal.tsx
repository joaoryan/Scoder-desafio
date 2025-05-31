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
                price: produto.price.toString().replace(",", "."),
            };
            await produtoService.createProduct(produtoFormatado);
            toast.success("Produto cadastrado com sucesso!");
            onClose();
            setForm({
                name: "",
                category: "",
                price: "0,00",
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
            <div className="fixed inset-0 bg-[#282262]/90 backdrop-blur-sm flex items-center justify-center z-50">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCadastrar(form);
                    }}
                    className="bg-[#3B328E] p-6 rounded-xl shadow-lg w-full max-w-md text-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>

                    <label className="block mb-3 text-[#CCCCCC]">
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`w-full border ${errors.name ? "border-red-400 bg-red-50 text-black" : "border-[#7045FF] bg-[#282262] text-white"} p-2 rounded mt-1 placeholder:text-[#CCCCCC]`}
                            placeholder="Nome do produto"
                            autoComplete="off"
                            required
                        />
                    </label>

                    <label className="block mb-3 text-[#CCCCCC]">
                        Categoria:
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={`w-full border ${errors.category ? "border-red-400 bg-red-50 text-black" : "border-[#7045FF] bg-[#282262] text-white"} p-2 rounded mt-1 placeholder:text-[#CCCCCC]`}
                            placeholder="Categoria do produto"
                            autoComplete="off"
                            required
                        />
                    </label>

                    <div className="flex gap-4 mb-3">
                        <label className="flex-1 text-[#CCCCCC]">
                            Preço:
                            <input
                                type="text"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className={`w-full border ${errors.price ? "border-red-400 bg-red-50 text-black" : "border-[#7045FF] bg-[#282262] text-white"} p-2 rounded mt-1 placeholder:text-[#CCCCCC]`}
                                placeholder="Ex: 23,50"
                                autoComplete="off"
                                required
                            />
                        </label>

                        <label className="flex-1 text-[#CCCCCC]">
                            Estoque:
                            <input
                                type="number"
                                name="stock"
                                min={0}
                                value={form.stock}
                                onChange={handleChange}
                                className={`w-full border ${errors.stock ? "border-red-400 bg-red-50 text-black" : "border-[#7045FF] bg-[#282262] text-white"} p-2 rounded mt-1 placeholder:text-[#CCCCCC]`}
                                placeholder="Qtd"
                                autoComplete="off"
                                required
                            />
                        </label>
                    </div>

                    <label className="block mb-5 text-[#CCCCCC]">
                        Descrição:
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className={`w-full border ${errors.description ? "border-red-400 bg-red-50 text-black" : "border-[#7045FF] bg-[#282262] text-white"} p-2 rounded mt-1 placeholder:text-[#CCCCCC]`}
                            placeholder="Descrição do produto"
                            autoComplete="off"
                            required
                        />
                    </label>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-[#080525] text-white hover:border-white border-2 border-transparent hover:shadow-lg transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-[#7045FF] text-white hover:border-white border-2 border-transparent hover:shadow-lg transition"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
