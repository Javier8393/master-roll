"use client";

import { CatalogFilters } from "@/components/dashboard/Catalog";

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

type Props = {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
};

export default function ControlBar({ filters, onChange, onReset }: Props) {
  // Obtener color del select basado en el valor seleccionado
  const getGenderSelectColor = () => filters.gender ? genderColors[filters.gender] : "bg-white";
  const getClassSelectColor = () => filters.characterClass ? classColors[filters.characterClass] : "bg-white";
  const getRaceSelectColor = () => filters.race ? raceColors[filters.race] : "bg-white";

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Ordenar por */}
      <select 
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as "createdAt" | "name" | "age" })}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt">Más recientes</option>
        <option value="name">Nombre A–Z</option>
        <option value="age">Edad</option>
      </select>

      {/* Dirección */}
      <select 
        value={filters.dir}
        onChange={(e) => onChange({ dir: e.target.value as "asc" | "desc" })}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="desc">Descendente</option>
        <option value="asc">Ascendente</option>
      </select>

      {/* Género */}
      <select 
        value={filters.gender}
        onChange={(e) => onChange({ gender: e.target.value as "" | "male" | "female" })}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getGenderSelectColor()}`}
      >
        <option value="" className="bg-white text-gray-900">Todos los géneros</option>
        <option value="male" className="bg-blue-100 text-blue-700">Masculino</option>
        <option value="female" className="bg-pink-100 text-pink-700">Femenino</option>
      </select>

      {/* Clase */}
      <select 
        value={filters.characterClass}
        onChange={(e) => onChange({ characterClass: e.target.value as "" | "mage" | "rogue" | "warrior" })}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getClassSelectColor()}`}
      >
        <option value="" className="bg-white text-gray-900">Todas las clases</option>
        <option value="warrior" className="bg-red-100 text-red-700">Guerrero</option>
        <option value="mage" className="bg-indigo-100 text-indigo-700">Mago</option>
        <option value="rogue" className="bg-yellow-100 text-yellow-700">Pícaro</option>
      </select>

      {/* Raza */}
      <select 
        value={filters.race}
        onChange={(e) => onChange({ race: e.target.value as "" | "human" | "elf" | "dwarf" | "gnome" })}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getRaceSelectColor()}`}
      >
        <option value="" className="bg-white text-gray-900">Todas las razas</option>
        <option value="human" className="bg-amber-100 text-amber-700">Humano</option>
        <option value="elf" className="bg-emerald-100 text-emerald-700">Elfo</option>
        <option value="dwarf" className="bg-orange-100 text-orange-700">Enano</option>
        <option value="gnome" className="bg-violet-100 text-violet-700">Gnomo</option>
      </select>

      {/* Resetear */}
      <button
        onClick={onReset}
        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-800 transition"
      >
        Resetear todo
      </button>
    </div>
  );
}