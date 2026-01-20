"use client";

import { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
};

export default function SearchBar({ value, onChange, onReset }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={value}
        onChange={handleChange}
        className="flex-1 rounded border px-3 py-2 text-sm"
      />
      {value && (
        <button
          onClick={() => onReset()}
          className="rounded border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Limpiar búsqueda
        </button>
      )}
    </div>
  );
}

