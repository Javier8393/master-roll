import Link from "next/link";
import { Dices, Swords, ClipboardList, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* Hero */}
      <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
        <Dices className="w-10 h-10" /> Bienvenido a Master Roll
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Tu herramienta para gestionar personajes de partidas de rol. 
        Crea, organiza y lleva el control de todos tus héroes en un solo lugar.
      </p>

      {/* Características */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-3">
            <Swords className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-1">Crea personajes</h3>
          <p className="text-sm text-gray-500">
            Define nombre, edad, raza, clase y más
          </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-3">
            <ClipboardList className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="font-semibold mb-1">Organiza tu catálogo</h3>
          <p className="text-sm text-gray-500">
            Filtra y ordena por cualquier atributo
          </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-3">
            <Star className="w-10 h-10 text-yellow-500" />
          </div>
          <h3 className="font-semibold mb-1">Marca favoritos</h3>
          <p className="text-sm text-gray-500">
            Destaca a tus personajes más usados
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/characters"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Ver personajes <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
