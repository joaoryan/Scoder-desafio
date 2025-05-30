"use client";

import { useState } from "react";
//import { Produto } from "@/types/produto"; // ou defina interface local

interface Props {
    produto: any;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ProdutoAcoes({ produto, onEdit, onDelete }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="text-xl px-2">
                ⋮
            </button>
            {open && (
                <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-lg z-50">
                    <button
                        onClick={() => {
                            onEdit();
                            setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        ✏️ Editar
                    </button>
                    <button
                        onClick={() => {
                            onDelete();
                            setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        🗑️ Deletar
                    </button>
                </div>
            )}
        </div>
    );
}
