"use client";

import Card from "@/components/catalog/Card";
import { Character } from "@/components/dashboard/Catalog";

type Props = {
  characters: Character[];
  onDeleted: () => void;
};

export function Grid({ characters, onDeleted }: Props) {
  // Si no hay personajes
  if (characters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay personajes con esos filtros.
      </div>
    );
  }

  // Renderizar grid de tarjetas
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <Card
          key={character.id}
          character={character}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  );
}

export default Grid;