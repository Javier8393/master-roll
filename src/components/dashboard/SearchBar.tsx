"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

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
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar personajes por nombre..."
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-600 font-medium hover:bg-gray-100 flex items-center gap-2"
      >
        <X className="w-4 h-4" /> Limpiar
      </button>
    </div>
  );
}