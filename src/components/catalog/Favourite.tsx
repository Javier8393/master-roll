"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";

type Props = {
  characterId: number;
  initialFavourite?: boolean;
  onFavouriteChanged?: () => void;
};

export default function Favourite({ characterId, initialFavourite = false, onFavouriteChanged }: Props) {
  const [isFavourite, setIsFavourite] = useState(initialFavourite);
  const [loading, setLoading] = useState(false);

  async function handleFavourite() {
    setLoading(true);
    try {
      const response = await fetch(`/api/characters/${characterId}/favourite`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Error al actualizar favorito");
      }

      const data = await response.json();
      setIsFavourite(data.isFavourite);
      // Notificar al padre que cambió
      onFavouriteChanged?.();
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar el favorito");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleFavourite}
      disabled={loading}
      className={`px-3 py-2 rounded-lg border-2 font-medium disabled:bg-gray-400 disabled:border-gray-400 ${
        isFavourite
          ? "bg-yellow-400 border-yellow-400 text-yellow-900 hover:bg-yellow-500 hover:border-yellow-500"
          : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400"
      }`}
      title={isFavourite ? "Remover de favoritos" : "Añadir a favoritos"}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className={`w-4 h-4 ${isFavourite ? "fill-current" : ""}`} />}
    </button>
  );
}