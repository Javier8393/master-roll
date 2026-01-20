import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Master Roll
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/characters" className="hover:text-gray-300 transition">
                Personajes
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        <p>© 2026 Master Roll - Gestión de Partidas de Rol</p>
      </footer>
    </div>
  );
}