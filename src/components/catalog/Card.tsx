"use client";

import Link from "next/link";
import { Character } from "@/components/dashboard/Catalog";
// import Delete from "@/components/catalog/Delete";
// import Favourite from "@/components/catalog/Favourite";

// Traducciones
const genderLabels: Record<string, string> = {
  male: "Masculino",
  female: "Femenino",
};

const raceLabels: Record<string, string> = {
  human: "Humano",
  elf: "Elfo",
  dwarf: "Enano",
  gnome: "Gnomo",
};

const classLabels: Record<string, string> = {
  mage: "Mago",
  rogue: "Pícaro",
  warrior: "Guerrero",
};

// Colores por género
const genderColors: Record<string, string> = {
  male: "bg-blue-100 text-blue-700",
  female: "bg-pink-100 text-pink-700",
};

// Colores por clase
const classColors: Record<string, string> = {
  warrior: "bg-red-100 text-red-700",
  mage: "bg-indigo-100 text-indigo-700",
  rogue: "bg-yellow-100 text-yellow-700",
};

// Colores por raza
const raceColors: Record<string, string> = {
  human: "bg-amber-100 text-amber-700",
  elf: "bg-emerald-100 text-emerald-700",
  dwarf: "bg-orange-100 text-orange-700",
  gnome: "bg-violet-100 text-violet-700",
};

type Props = {
  character: Character;
  onDeleted: () => void;
};

export function Card({ character, onDeleted }: Props) {
  return (
    <article className="rounded border p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header: Nombre y edad */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="font-semibold text-gray-900 text-lg">{character.name}</h2>
        <span className="text-sm text-gray-500">{character.age} años</span>
      </div>

      {/* Género, Raza y Clase en la misma línea */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`inline-block px-2 py-1 text-xs rounded ${genderColors[character.gender] || "bg-gray-100 text-gray-700"}`}>
          {genderLabels[character.gender] || character.gender}
        </span>
        <span className={`inline-block px-2 py-1 text-xs rounded ${raceColors[character.race] || "bg-gray-100 text-gray-700"}`}>
          {raceLabels[character.race] || character.race}
        </span>
        <span className={`inline-block px-2 py-1 text-xs rounded ${classColors[character.characterClass] || "bg-gray-100 text-gray-700"}`}>
          {classLabels[character.characterClass] || character.characterClass}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-700 line-clamp-3 mb-4">
        {character.description}
      </p>

      {/* Acciones */}
      <div className="flex gap-2 text-sm">
        <Link
          href={`/characters/${character.id}`}
          className="flex-1 text-center px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Ver
        </Link>

        {/*<Favourite characterId={character.id} />*/}

        {/*<Delete
          characterId={character.id}
          characterName={character.name}
          onDeleted={onDeleted}
        />*/}
      </div>

      {/* Metadata 
      <div className="mt-3 text-xs text-gray-400">
        Creado: {new Date(character.createdAt).toLocaleDateString()}
      </div>*/}
    </article>
  );
}

export default Card;