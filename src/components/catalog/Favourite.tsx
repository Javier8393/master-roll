"use client";

import { useState } from "react";

type Props = {
  characterId: number;
};

export default function Favourite({ characterId }: Props) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFavourite() {
    setLoading(true);
    try {
      // TODO: Lógica para marcar/desmarcar como favorito en la BD
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleFavourite}
      disabled={loading}
      className={`px-3 py-2 rounded transition disabled:opacity-50 ${
        isFavourite
          ? "bg-yellow-500 text-white hover:bg-yellow-600"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {loading ? "..." : isFavourite ? "★" : "☆"}
    </button>
  );
}