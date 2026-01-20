"use client";

import { CatalogFilters } from "@/components/dashboard/Catalog.client";

type Props = {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
};

export default function ControlBar({ filters, onChange, onReset }: Props) {
  return (
    <div className="space-y-3">
      {/* SECCIÓN DE GÉNERO */}
      <div className="flex flex-wrap gap-2">
        <button
            onClick={() => onChange({ gender: filters.gender === "male" ? "" : "male" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.gender === "male" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Male
        </button>
        <button
            onClick={() => onChange({ gender: filters.gender === "female" ? "" : "female" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.gender === "female" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Female
        </button>
    </div>

      {/* SECCIÓN DE RAZA */}
      <div className="flex flex-wrap gap-2">
        <button
            onClick={() => onChange({ race: filters.race === "human" ? "" : "human" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.race === "human" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Human
        </button>

        <button
            onClick={() => onChange({ race: filters.race === "elf" ? "" : "elf" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.race === "elf" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Elf
        </button>

        <button
            onClick={() => onChange({ race: filters.race === "dwarf" ? "" : "dwarf" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.race === "dwarf" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Dwarf
        </button>

        <button
            onClick={() => onChange({ race: filters.race === "gnome" ? "" : "gnome" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.race === "gnome" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Gnome
        </button>
      </div>

      {/* SECCIÓN DE ORDENAMIENTO */}
      <div className="flex flex-wrap gap-2">
        <button
            onClick={() => onChange({ sort: "createdAt" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.sort === "createdAt" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Created At
        </button>

        <button
            onClick={() => onChange({ sort: "name" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.sort === "name" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Name
        </button>

        <button
            onClick={() => onChange({ sort: "age" })}
            className={`rounded border px-3 py-2 text-sm ${
            filters.sort === "age" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
        >
            Age
        </button>

        <button
            onClick={() => onChange( {dir: "asc"})}
            className={`rounded border px-3 py-2 text-sm ${
            filters.dir === "asc" ? "bg-blue-500 text-white" : "hover:bg-gray-100" 
            }`}
        >
            Asc
        </button>

          <button
            onClick={() => onChange( {dir: "desc"})}
            className={`rounded border px-3 py-2 text-sm ${
            filters.dir === "desc" ? "bg-blue-500 text-white" : "hover:bg-gray-100" 
            }`}
        >
            Desc
        </button>



      </div>

      {/* BOTÓN RESET */}
      <button
            onClick={() => onReset()}
            className="rounded border px-3 py-2 text-sm hover:bg-gray-100"
        >
            Reset Filters
        </button> 
    </div>
  );
}
