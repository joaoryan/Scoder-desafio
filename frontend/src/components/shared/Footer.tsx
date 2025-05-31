export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 text-gray-700 p-4 mt-auto">
            <div className="max-w-6xl mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} Meu Sistema de Vendas. Todos os direitos reservados.
            </div>
        </footer>
    );
}
