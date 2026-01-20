"use client";

import { Card } from "@/components/catalog/Card.client";
import { Character } from "@/components/dashboard/Catalog.client";

type Props = {
  characters: Character[];
  onDeleted: () => void;
};

export default function Grid({ characters, onDeleted }: Props) {
  // Si no hay personajes
  if (characters.length === 0) {
    return (
      <div className="text-center opacity-70">
        No hay personajes con esos filtros.
      </div>
    );
  }

  // Renderizar grid de tarjetas
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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