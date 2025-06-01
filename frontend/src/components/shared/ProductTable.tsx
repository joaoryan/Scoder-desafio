"use client";
import { ProductsModel } from "@/models/produtcs";
import { formatCurrencyBR } from "@/utils/formatCurrency";

interface ProductTableProps {
    produtos: ProductsModel[];
    onEdit: (produto: ProductsModel) => void;
    onDelete: (produto: ProductsModel) => void;
}

export default function ProductTable({ produtos, onEdit, onDelete }: ProductTableProps) {
    return (
        <section className="mb-10 shadow-md rounded-xl bg-[#3B328E]">
            <div className="overflow-y-auto max-h-[360px] rounded-xl">
                <table className="min-w-full text-white">
                    <thead className="bg-[#7045FF] sticky top-0 z-10">
                        <tr>
                            <th className="text-left p-3">ID</th>
                            <th className="text-left p-3">Nome</th>
                            <th className="text-left p-3">Categoria</th>
                            <th className="text-left p-3">Preço</th>
                            <th className="text-left p-3">Vendas</th>
                            <th className="text-left p-3">Estoque</th>
                            <th className="text-left p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id} className="border-t border-gray-600 text-gray-300">
                                <td className="p-3">{produto.id}</td>
                                <td className="p-3">{produto.name}</td>
                                <td className="p-3">{produto.category}</td>
                                <td className="p-3">{formatCurrencyBR(produto.price)}</td>
                                <td className="p-3">{produto.sales ?? 0}</td>
                                <td className="p-3">{produto.stock ?? 0}</td>
                                <td className="p-3 flex justify-end gap-10">
                                    <button onClick={() => onEdit(produto)} title="Editar" className="text-blue-300 hover:text-blue-500 cursor-pointer">
                                        ✏️
                                    </button>
                                    <button onClick={() => onDelete(produto)} title="Excluir" className="text-red-400 hover:text-red-600 cursor-pointer">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
