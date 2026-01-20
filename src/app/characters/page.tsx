import Link from "next/link";
import { headers } from "next/headers";
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

  // Construir query string
  const qs = new URLSearchParams();
  if (search) qs.set("search", search);
  if (gender) qs.set("gender", gender);
  if (race) qs.set("race", race);
  if (characterClass) qs.set("characterClass", characterClass);
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
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Personajes</h1>
        <Link 
          href="/characters/new"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Nuevo
        </Link>
      </header>

      {/* Un solo componente que lo maneja todo */}
      <Catalog 
        initialCharacters={characters}
        initialFilters={{ search, gender, race, characterClass, sort, dir }}
      />
    </main>
  );
}