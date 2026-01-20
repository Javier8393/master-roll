"use client";

import { useState, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
};

export default function SearchBar({ value, onChange, onReset }: Props) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleSearch = (newValue: string) => {
    setInput(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Buscar personajes por nombre..."
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onReset}
        className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-800 transition"
      >
        Limpiar
      </button>
    </div>
  );
}