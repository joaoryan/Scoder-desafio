"use client";

export default function Header() {
    return (
        <header className="w-full bg-green-600 text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-xl font-bold">Meu Sistema de Vendas</h1>
                <nav className="space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/produtos" className="hover:underline">Produtos</a>
                    <a href="/vendas" className="hover:underline">Vendas</a>
                </nav>
            </div>
        </header>
    );
}
