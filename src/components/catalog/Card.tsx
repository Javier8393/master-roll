"use client";

import Link from "next/link";
import Delete from "./Delete";
import Favourite from "./Favourite";
import { Character } from "@/components/dashboard/Catalog";

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

// Estilos base
const cardStyles = {
  container: "border-2 border-gray-200 rounded-xl p-5 bg-white hover:border-blue-300 hover:shadow-md transition-all",
  header: "flex justify-between items-center mb-3",
  title: "font-bold text-xl text-gray-800",
  age: "text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded",
  badges: "flex flex-wrap gap-2 mb-4",
  badge: "px-3 py-1 text-xs font-medium rounded-full",
  description: "text-sm text-gray-600 mb-5 leading-relaxed",
  actions: "flex gap-2 pt-3 border-t border-gray-100",
  buttonPrimary: "flex-1 text-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700",
} as const;

type Props = {
  character: Character;
  onDeleted: () => void;
  onFavouriteChanged?: () => void;
};

export function Card({ character, onDeleted, onFavouriteChanged }: Props) {
  return (
    <article className={cardStyles.container}>
      {/* Header: Nombre y edad */}
      <div className={cardStyles.header}>
        <h2 className={cardStyles.title}>{character.name}</h2>
        <span className={cardStyles.age}>{character.age} años</span>
      </div>

      {/* Género, Raza y Clase */}
      <div className={cardStyles.badges}>
        <span className={`${cardStyles.badge} ${genderColors[character.gender] || "bg-gray-100 text-gray-700"}`}>
          {genderLabels[character.gender] || character.gender}
        </span>
        <span className={`${cardStyles.badge} ${raceColors[character.race] || "bg-gray-100 text-gray-700"}`}>
          {raceLabels[character.race] || character.race}
        </span>
        <span className={`${cardStyles.badge} ${classColors[character.characterClass] || "bg-gray-100 text-gray-700"}`}>
          {classLabels[character.characterClass] || character.characterClass}
        </span>
      </div>

      {/* Descripción */}
      <p className={cardStyles.description}>
        {character.description}
      </p>

      {/* Acciones */}
      <div className={cardStyles.actions}>
        <Link
          href={`/characters/${character.id}`}
          className={cardStyles.buttonPrimary}
        >
          Ver
        </Link>

        {<Favourite 
          characterId={character.id} 
          initialFavourite={character.isFavourite === 1}
          onFavouriteChanged={onFavouriteChanged}
        />}

        {<Delete
          characterId={character.id}
          characterName={character.name}
          onDeleted={onDeleted}
        />}
      </div>

      {/* Metadata 
      <div className="mt-3 text-xs text-gray-400">
        Creado: {new Date(character.createdAt).toLocaleDateString()}
      </div>*/}
    </article>
  );
}

export default Card;