"use client";

import { useState } from "react";

type Props = {
  characterId: number;
  characterName: string;
  onDeleted: () => void;
};

export function Delete({ characterId, characterName, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Estás seguro de que deseas eliminar a ${characterName}?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/characters/${characterId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el personaje");
      }
      onDeleted();
    } catch (error) {
      console.error("Error deleting character:", error);
      alert("Hubo un error al eliminar el personaje.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
    >
      {loading ? "..." : "✕"}
    </button>
  );
}

export default Delete;