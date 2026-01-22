"use client";

import { RotateCcw } from "lucide-react";
import { CatalogFilters } from "@/components/dashboard/Catalog";

// Colores por género
const genderColors: Record<string, string> = {
  male: "bg-blue-100 text-blue-800 border-blue-300",
  female: "bg-pink-100 text-pink-800 border-pink-300",
};

// Colores por clase
const classColors: Record<string, string> = {
  warrior: "bg-red-100 text-red-800 border-red-300",
  mage: "bg-indigo-100 text-indigo-800 border-indigo-300",
  rogue: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

// Colores por raza
const raceColors: Record<string, string> = {
  human: "bg-amber-100 text-amber-800 border-amber-300",
  elf: "bg-emerald-100 text-emerald-800 border-emerald-300",
  dwarf: "bg-orange-100 text-orange-800 border-orange-300",
  gnome: "bg-violet-100 text-violet-800 border-violet-300",
};

// Colores por favoritos
const favouriteColors: Record<string, string> = {
  "true": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "false": "bg-gray-100 text-gray-700 border-gray-300",
};

type Props = {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
};

export default function ControlBar({ filters, onChange, onReset }: Props) {
  // Obtener color del select basado en el valor seleccionado
  const getGenderSelectColor = () => filters.gender ? genderColors[filters.gender] : "bg-white text-gray-700 border-gray-300";
  const getClassSelectColor = () => filters.characterClass ? classColors[filters.characterClass] : "bg-white text-gray-700 border-gray-300";
  const getRaceSelectColor = () => filters.race ? raceColors[filters.race] : "bg-white text-gray-700 border-gray-300";
  const getFavouriteSelectColor = () => filters.isFavourite ? favouriteColors[filters.isFavourite] : "bg-white text-gray-700 border-gray-300";
  
  const selectBaseClass = "border-2 rounded-lg px-4 py-2 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="bg-gray-50 border rounded-lg p-4 h-full">
      <div className="flex flex-col gap-3">
        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-600 border-b pb-2 mb-1">Filtros</h3>

        {/* Ordenar por */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Ordenar por</label>
          <select 
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as "createdAt" | "name" | "age" })}
            className={`${selectBaseClass} bg-white text-gray-700 border-gray-300 w-full`}
          >
            <option value="createdAt">Más recientes</option>
            <option value="name">Nombre A-Z</option>
            <option value="age">Edad</option>
          </select>
        </div>

        {/* Dirección */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Dirección</label>
          <select 
            value={filters.dir}
            onChange={(e) => onChange({ dir: e.target.value as "asc" | "desc" })}
            className={`${selectBaseClass} bg-white text-gray-700 border-gray-300 w-full`}
          >
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select>
        </div>

        {/* Separador */}
        <hr className="border-gray-200" />

        {/* Género */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Género</label>
          <select 
            value={filters.gender}
            onChange={(e) => onChange({ gender: e.target.value as "" | "male" | "female" })}
            className={`${selectBaseClass} ${getGenderSelectColor()} w-full`}
          >
            <option value="">Todos</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>

        {/* Clase */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Clase</label>
          <select 
            value={filters.characterClass}
            onChange={(e) => onChange({ characterClass: e.target.value as "" | "mage" | "rogue" | "warrior" })}
            className={`${selectBaseClass} ${getClassSelectColor()} w-full`}
          >
            <option value="">Todas</option>
            <option value="warrior">Guerrero</option>
            <option value="mage">Mago</option>
            <option value="rogue">Pícaro</option>
          </select>
        </div>

        {/* Raza */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Raza</label>
          <select 
            value={filters.race}
            onChange={(e) => onChange({ race: e.target.value as "" | "human" | "elf" | "dwarf" | "gnome" })}
            className={`${selectBaseClass} ${getRaceSelectColor()} w-full`}
          >
            <option value="">Todas</option>
            <option value="human">Humano</option>
            <option value="elf">Elfo</option>
            <option value="dwarf">Enano</option>
            <option value="gnome">Gnomo</option>
          </select>
        </div>

        {/* Favoritos */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Favoritos</label>
          <select
            value={filters.isFavourite}
            onChange={(e) =>
              onChange({ isFavourite: e.target.value as "" | "true" | "false" })
            }
            className={`${selectBaseClass} ${getFavouriteSelectColor()} w-full`}
          >
            <option value="">Todos</option>
            <option value="true">Solo favoritos</option>
            <option value="false">No favoritos</option>
          </select>
        </div>

        {/* Separador */}
        <hr className="border-gray-200" />

        {/* Resetear */}
        <button
          onClick={onReset}
          className="w-full px-4 py-2 rounded-lg border-2 border-red-500 bg-red-500 text-white font-medium hover:bg-red-600 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Resetear
        </button>
      </div>
    </div>
  );
}