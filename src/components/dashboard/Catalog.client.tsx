"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@/components/catalog/Grid.client";
import ControlBar from "@/components/dashboard/ControlBar.client";
import SearchBar from "@/components/dashboard/SearchBar.client";

export type Character = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  race: "human" | "elf" | "dwarf" | "gnome";
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CatalogFilters = {
  search: string;
  gender: "" | "male" | "female";
  race: "" | "human" | "elf" | "dwarf" | "gnome";
  sort: "createdAt" | "name" | "age";
  dir: "asc" | "desc";
};

type Props = {
  initialCharacters: Character[];
  initialFilters?: Partial<CatalogFilters>;
};

const DEFAULT_FILTERS: CatalogFilters = {
  search: "",
  gender: "",
  race: "",
  sort: "createdAt",
  dir: "desc",
};

function buildQuery(filters: CatalogFilters) {
  const qs = new URLSearchParams();
  if (filters.search.trim()) qs.set("search", filters.search.trim());
  if (filters.gender) qs.set("gender", filters.gender);
  if (filters.race) qs.set("race", filters.race);
  qs.set("sort", filters.sort);
  qs.set("dir", filters.dir);
  return qs.toString();
}

export default function Catalog({ initialCharacters, initialFilters }: Props) {
  const [filters, setFilters] = useState<CatalogFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Para evitar condiciones de carrera (si haces filtros rápidos)
  const requestIdRef = useRef(0);

  const queryString = useMemo(() => buildQuery(filters), [filters]);

  async function refetch(nextFilters?: CatalogFilters) {
    const f = nextFilters ?? filters;
    const myRequestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const qs = buildQuery(f);
      const res = await fetch(`/api/characters?${qs}`, { method: "GET" });
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = (await res.json()) as Character[];

      // Si otra request más nueva ya terminó, ignoramos esta
      if (myRequestId !== requestIdRef.current) return;

      setCharacters(data);
    } catch (e) {
      if (myRequestId !== requestIdRef.current) return;
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      if (myRequestId !== requestIdRef.current) return;
      setLoading(false);
    }
  }

  // Refetch automático cuando cambian filtros/orden/búsqueda
  // (con debounce ligero para search)
  useEffect(() => {
    const t = setTimeout(() => {
      refetch();
    }, 250);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  // Callbacks que usarán tus componentes hijos
  function onSearchChange(value: string) {
    setFilters((prev) => ({ ...prev, search: value }));
  }

  function onFiltersChange(patch: Partial<CatalogFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  async function onDeleted() {
    // Cuando borres, lo más limpio es refetch.
    await refetch();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Characters</h1>
        <div className="text-sm opacity-70">
          {loading ? "Cargando..." : `${characters.length} resultados`}
        </div>
      </div>

      <SearchBar value={filters.search} onChange={onSearchChange} onReset={resetFilters} />

      <ControlBar
        filters={filters}
        onChange={onFiltersChange}
        onReset={resetFilters}
      />

      {error && (
        <div className="rounded border p-3 text-sm">
          Error: {error}
        </div>
      )}

      <Grid characters={characters} onDeleted={onDeleted} />
    </div>
  );
}
