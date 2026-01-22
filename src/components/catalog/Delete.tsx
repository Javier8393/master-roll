"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

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
      className="px-3 py-2 rounded-lg border-2 border-red-500 bg-red-500 text-white font-medium hover:bg-red-600 hover:border-red-600 disabled:bg-gray-400 disabled:border-gray-400"
      title="Eliminar"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}

export default Delete;