import Link from "next/link";
import { Dices, Users } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
          <Link href="/" className="text-xl font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Dices className="w-6 h-6" /> Master Roll
          </Link>
          <ul className="flex gap-4">
            <li>
              <Link href="/characters" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Users className="w-5 h-5" /> Personajes
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenido */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-3 text-center text-gray-600 text-sm border-t">
        <p>© 2026 Master Roll - Gestión de Partidas de Rol</p>
      </footer>
    </div>
  );
}