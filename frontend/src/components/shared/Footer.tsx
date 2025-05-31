export default function Footer() {
    return (
        <footer className="w-full bg-[#282262] text-gray-300 p-4 mt-auto">
            {/* Lista branca no topo com espaçamento lateral de 20px */}
            <div className="h-[1px] bg-white mx-1 mb-4 rounded-full" />

            <div className="max-w-6xl mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} SuriStore. Todos os direitos reservados.
            </div>
        </footer>
    );
}
