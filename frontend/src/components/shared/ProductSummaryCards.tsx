"use client";

import Image from "next/image";
import suricatostore from "@/img/suricato-gerente.png";
import { ProductsModel } from "@/models/produtcs";
import { useEffect, useState } from "react";

interface CategoriaResumo {
    categoria: string;
    quantidade: number;
}

interface ProductSummaryCardsProps {
    produtos: ProductsModel[];
}

export default function ProductSummaryCards({ produtos }: ProductSummaryCardsProps) {
    const [resumoCategorias, setResumoCategorias] = useState<CategoriaResumo[]>([]);

    useEffect(() => {

        const resumo = produtos.reduce((acc: Record<string, number>, prod) => {
            acc[prod.category] = (acc[prod.category] || 0) + 1;
            return acc;
        }, {});

        const categorias = Object.entries(resumo).map(([categoria, quantidade]) => ({
            categoria,
            quantidade,
        }));

        setResumoCategorias(categorias);
    }, [produtos]);


    return (
        <section className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="relative">
                <Image
                    src={suricatostore}
                    alt="Ícone flutuante"
                    width={80}
                    height={80}
                    className="absolute -top-27 left-4 z-10"
                />

                <section className="bg-[#3B328E] shadow-md rounded-xl p-4 text-white flex min-h-[200px] w-full">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h2 className="text-lg font-semibold mb-2 text-center">Total de Produtos</h2>
                        <p className="text-3xl font-bold" aria-live="polite">
                            {produtos.length}
                        </p>
                    </div>

                    <div className="border-l border-[#7045FF] mx-4" />

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h2 className="text-lg font-semibold mb-2 text-center">Top 3 Produtos Mais Vendidos</h2>
                        <ol className="list-decimal list-inside space-y-1 text-sm w-full max-w-[180px]">
                            {produtos
                                .slice()
                                .sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0))
                                .slice(0, 3)
                                .map((produto) => (
                                    <li key={produto.id} className="flex justify-between px-2">
                                        <span className="truncate max-w-[70%]">{produto.name}</span>
                                        <span className="font-semibold text-[#7045FF]">{produto.sales ?? 0}</span>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </section>
            </div>

            <div className="md:col-span-2 bg-[#3B328E] shadow-md rounded-xl p-4 overflow-x-hidden min-h-[200px]">
                <h2 className="text-xl font-semibold mb-2">Produtos por Categoria</h2>
                <div className="flex p-4 gap-3 overflow-x-auto">
                    {resumoCategorias.map((cat) => (
                        <div
                            key={cat.categoria}
                            className="flex flex-col items-center justify-center bg-[#282262] rounded-lg p-4 min-w-[120px]"
                        >
                            <span className="text-md font-medium">{cat.categoria}</span>
                            <span className="text-xl font-bold">{cat.quantidade}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
