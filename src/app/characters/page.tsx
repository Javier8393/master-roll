import Link from "next/link";
import { headers } from "next/headers";
import { Swords, Plus } from "lucide-react";
import Catalog from "@/components/dashboard/Catalog";

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(sp: SearchParams, key: string): string | undefined {
  const v = sp[key];
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const search = getParam(sp, "search") ?? "";
  const gender = (getParam(sp, "gender") ?? "") as "" | "male" | "female";
  const race = (getParam(sp, "race") ?? "") as "" | "human" | "elf" | "dwarf" | "gnome";
  const characterClass = (getParam(sp, "characterClass") ?? "") as "" | "mage" | "rogue" | "warrior";
  const sort = (getParam(sp, "sort") ?? "createdAt") as "createdAt" | "name" | "age";
  const dir = (getParam(sp, "dir") ?? "desc") as "asc" | "desc";
  const isFavourite = (getParam(sp, "isFavourite") ?? "") as "" | "true" | "false";

  // Construir query string
  const qs = new URLSearchParams();
  if (search) qs.set("search", search);
  if (gender) qs.set("gender", gender);
  if (race) qs.set("race", race);
  if (characterClass) qs.set("characterClass", characterClass);
  if (isFavourite) qs.set("isFavourite", isFavourite);
  qs.set("sort", sort);
  qs.set("dir", dir);
  
  // Obtener datos
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/characters?${qs.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Personajes</h1>
        <p className="mt-2 text-red-500">Error cargando personajes.</p>
      </main>
    );
  }

  const characters = await res.json();

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Swords className="w-8 h-8" /> Personajes
          </h1>
          <p className="text-gray-500 mt-1">Gestiona tu colección de héroes</p>
        </div>
        <Link 
          href="/characters/new"
          className="px-5 py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Nuevo personaje
        </Link>
      </header>

      {/* Catálogo con altura flexible */}
      <div className="flex-1 min-h-0">
        <Catalog 
          initialCharacters={characters}
          initialFilters={{ search, gender, race, characterClass, isFavourite, sort, dir }}
        />
      </div>
    </div>
  );
}