"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/img/logo.png";

export default function Header() {
    return (
        <header className="w-full bg-[#3B328E] text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={logo}
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </div>

                <nav className="space-x-20">
                    <Link href="/" className="hover:text-[#7045FF]">SuriGestor</Link>
                    <Link href="/vendas" className="hover:text-[#7045FF]">SuriStore</Link>
                </nav>
            </div>
        </header>
    );
}
