"use client";
import { ProductsModel } from "@/models/produtcs";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Bar,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

interface ProductAnalyticsProps {
    produtos: ProductsModel[];
}

export default function ProductAnalytics({ produtos }: ProductAnalyticsProps) {
    const vendasPorCategoria = produtos.reduce((acc: Record<string, number>, prod) => {
        acc[prod.category] = (acc[prod.category] || 0) + (prod.sales ?? 0);
        return acc;
    }, {});

    const dadosVendasCategoria = Object.entries(vendasPorCategoria).map(([categoria, total]) => ({
        categoria,
        total,
    }));

    return (
        <>
            <section className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#3B328E] shadow-md rounded-xl p-6">
                    <h2 className=" text-xl font-semibold mb-4">Vendas por Produto</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={produtos}
                                dataKey="sales"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {produtos.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#3B328E] shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Vendas por Categoria</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dadosVendasCategoria}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                            <XAxis dataKey="categoria" stroke="#FFFFFF" />
                            <YAxis stroke="#FFFFFF" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#7045FF" name="Total de Vendas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="bg-[#3B328E] shadow-md rounded-xl p-6 mt-10">
                <h2 className="text-xl font-semibold mb-4">Estoque</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={produtos}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                        <XAxis dataKey="name" stroke="#FFFFFF" />
                        <YAxis stroke="#FFFFFF" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Unidades vendidas até o momento" />
                        <Bar dataKey="stock" fill="#00C49F" name="Quantidade disponível em estoque" />
                    </BarChart>
                </ResponsiveContainer>
            </section>
        </>
    );
}
