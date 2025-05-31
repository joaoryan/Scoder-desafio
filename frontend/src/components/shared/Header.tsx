"use client";

import Image from 'next/image';
import logo from "@/img/logo.png";

export default function Header() {
    return (
        <header className="w-full bg-[#3B328E] text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <Image
                        src={logo}      // ajuste para o caminho da sua imagem
                        alt="Logo"
                        className="h-10 w-auto" // altura 32px, largura automática para manter proporção
                    />
                </div>

                <nav className="space-x-20">
                    <a href="/" className="hover:text-[#7045FF]">SuriGestor</a>
                    <a href="/vendas" className="hover:text-[#7045FF]">SuriStore</a>
                </nav>
            </div>
        </header>
    );
}
