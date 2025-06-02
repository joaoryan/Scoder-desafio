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
                {/* Gráfico de Vendas por Produto */}
                <div className="bg-[#3B328E] shadow-md rounded-xl p-6 h-[460px]">
                    <h2 className="text-xl font-semibold mb-4">Vendas por Produto</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <PieChart>
                            <Pie
                                data={produtos}
                                dataKey="sales"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label
                            >
                                {produtos.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{ fontSize: "12px" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de Vendas por Categoria */}
                <div className="bg-[#3B328E] shadow-md rounded-xl p-6 h-[460px]">
                    <h2 className="text-xl font-semibold mb-4">Vendas por Categoria</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart
                            data={dadosVendasCategoria}
                            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                            <XAxis
                                dataKey="categoria"
                                stroke="#FFFFFF"
                                angle={-30}
                                textAnchor="end"
                                interval={0}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis stroke="#FFFFFF" />
                            <Tooltip />
                            <Legend
                                verticalAlign="top"
                                align="center"
                                wrapperStyle={{ marginBottom: "20px", fontSize: "12px" }}
                            />
                            <Bar dataKey="total" fill="#7045FF" name="Total de Vendas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Gráfico de Estoque */}
            <section className="bg-[#3B328E] shadow-md rounded-xl p-6 mt-10 overflow-x-auto h-[500px]">
                <h2 className="text-xl font-semibold mb-4">Estoque</h2>
                <div className="min-w-[800px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={produtos}
                            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                            <XAxis
                                dataKey="name"
                                stroke="#FFFFFF"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis stroke="#FFFFFF" />
                            <Tooltip />
                            <Legend
                                verticalAlign="top"
                                align="center"
                                wrapperStyle={{ marginBottom: "20px", fontSize: "12px" }}
                            />
                            <Bar dataKey="sales" fill="#8884d8" name="Unidades vendidas até o momento" />
                            <Bar dataKey="stock" fill="#00C49F" name="Quantidade disponível em estoque" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </>
    );
}
