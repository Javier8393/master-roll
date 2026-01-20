"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Grid from "@/components/catalog/Grid";
import SearchBar from "@/components/dashboard/SearchBar";
import ControlBar from "@/components/dashboard/ControlBar";

export type Character = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  race: "human" | "elf" | "dwarf" | "gnome";
  characterClass: "mage" | "rogue" | "warrior";
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CatalogFilters = {
  search: string;
  gender: "" | "male" | "female";
  race: "" | "human" | "elf" | "dwarf" | "gnome";
  characterClass: "" | "mage" | "rogue" | "warrior";
  sort: "createdAt" | "name" | "age";
  dir: "asc" | "desc";
};

type Props = {
  initialCharacters: Character[];
  initialFilters: CatalogFilters;
};

export default function Catalog({ initialCharacters, initialFilters }: Props) {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [loading, setLoading] = useState(false);

  // Función para actualizar la URL y refetch
  const updateFilters = useCallback(
    async (newFilters: Partial<CatalogFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      // Construir query string
      const qs = new URLSearchParams();
      if (updatedFilters.search) qs.set("search", updatedFilters.search);
      if (updatedFilters.gender) qs.set("gender", updatedFilters.gender);
      if (updatedFilters.race) qs.set("race", updatedFilters.race);
      if (updatedFilters.characterClass) qs.set("characterClass", updatedFilters.characterClass);
      qs.set("sort", updatedFilters.sort);
      qs.set("dir", updatedFilters.dir);

      // Actualizar URL
      router.push(`/characters?${qs.toString()}`);

      // Fetch de datos
      setLoading(true);
      try {
        const res = await fetch(`/api/characters?${qs.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setCharacters(data);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters, router]
  );

  // Resetear filtros
  const handleReset = useCallback(() => {
    const resetFilters: CatalogFilters = {
      search: "",
      gender: "",
      characterClass: "",
      race: "",
      sort: "createdAt",
      dir: "desc",
    };
    updateFilters(resetFilters);
  }, [updateFilters]);

  // Refetch cuando se elimina un personaje
  const handleDeleted = useCallback(async () => {
    const qs = new URLSearchParams();
    if (filters.search) qs.set("search", filters.search);
    if (filters.gender) qs.set("gender", filters.gender);
    if (filters.race) qs.set("race", filters.race);
    if (filters.characterClass) qs.set("characterClass", filters.characterClass);
    qs.set("sort", filters.sort);
    qs.set("dir", filters.dir);

    try {
      const res = await fetch(`/api/characters?${qs.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCharacters(data);
      }
    } catch (error) {
      console.error("Error refetching characters:", error);
    }
  }, [filters]);

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <SearchBar 
        value={filters.search}
        onChange={(search) => updateFilters({ search })}
        onReset={handleReset}
      />

      {/* Controles de filtro y ordenamiento */}
      <ControlBar 
        filters={filters}
        onChange={(patch) => updateFilters(patch)}
        onReset={handleReset}
      />

      {/* Estado de carga */}
      {loading && <p className="text-gray-500">Cargando...</p>}

      {/* Grid de personajes */}
      <Grid 
        characters={characters}
        onDeleted={handleDeleted}
      />
    </div>
  );
}