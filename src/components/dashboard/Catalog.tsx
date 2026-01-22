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
  isFavourite: 0 | 1;
  createdAt: Date;
  updatedAt: Date;
};

export type CatalogFilters = {
  search: string;
  gender: "" | "male" | "female";
  race: "" | "human" | "elf" | "dwarf" | "gnome";
  characterClass: "" | "mage" | "rogue" | "warrior";
  isFavourite: "" | "true" | "false";
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

  // Función para refrescar los datos sin cambiar filtros
  const refreshData = useCallback(async () => {
    const qs = new URLSearchParams();
    if (filters.search) qs.set("search", filters.search);
    if (filters.gender) qs.set("gender", filters.gender);
    if (filters.race) qs.set("race", filters.race);
    if (filters.characterClass) qs.set("characterClass", filters.characterClass);
    if (filters.isFavourite) qs.set("isFavourite", filters.isFavourite);
    qs.set("sort", filters.sort);
    qs.set("dir", filters.dir);

    try {
      const res = await fetch(`/api/characters?${qs.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCharacters(data);
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }, [filters]);

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
      if (updatedFilters.isFavourite) qs.set("isFavourite", updatedFilters.isFavourite);
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
      isFavourite: "",
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
    <div className="flex gap-6 h-full">
      {/* Sidebar de filtros */}
      <aside className="w-64 shrink-0">
        <ControlBar 
          filters={filters}
          onChange={(patch) => updateFilters(patch)}
          onReset={handleReset}
        />
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Barra de búsqueda */}
        <div className="mb-4">
          <SearchBar 
            value={filters.search}
            onChange={(search) => updateFilters({ search })}
            onReset={handleReset}
          />
        </div>

        {/* Estado de carga */}
        {loading && <p className="text-gray-500 mb-2">Cargando...</p>}

        {/* Grid de personajes */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          <Grid 
            characters={characters}
            onDeleted={handleDeleted}
            onFavouriteChanged={refreshData}
          />
        </div>
      </div>
    </div>
  );
}