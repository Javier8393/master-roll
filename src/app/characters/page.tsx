import Link from "next/link";
import { headers } from "next/headers";

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
  const gender = getParam(sp, "gender") ?? "";
  const race = getParam(sp, "race") ?? "";
  const sort = getParam(sp, "sort") ?? "createdAt";
  const dir = getParam(sp, "dir") ?? "desc";

  const qs = new URLSearchParams();
  if (search) qs.set("search", search);
  if (gender) qs.set("gender", gender);
  if (race) qs.set("race", race);
  if (sort) qs.set("sort", sort);
  if (dir) qs.set("dir", dir);

  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/characters?${qs.toString()}`, {
    cache: "no-store",
});

  if (!res.ok) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Characters</h1>
        <p className="mt-2">Error cargando personajes (status {res.status}).</p>
      </main>
    );
  }

  const characters: Array<{
    id: number;
    name: string;
    age: number;
    gender: "male" | "female";
    race: "human" | "elf" | "dwarf" | "gnome";
    description: string;
    createdAt: string;
    updatedAt: string;
  }> = await res.json();

  return (
    <main className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Characters</h1>
        <Link className="underline" href="/characters/new">
          Nuevo
        </Link>
      </header>

      {/* Controles: por ahora enlaces simples (sin JS) */}
      <section className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Link className="underline" href={`/characters?sort=createdAt&dir=desc`}>Más recientes</Link>
          <Link className="underline" href={`/characters?sort=name&dir=asc`}>Nombre A–Z</Link>
          <Link className="underline" href={`/characters?sort=age&dir=desc`}>Edad (desc)</Link>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link className="underline" href={`/characters?gender=male`}>Male</Link>
          <Link className="underline" href={`/characters?gender=female`}>Female</Link>
          <Link className="underline" href={`/characters?race=human`}>Human</Link>
          <Link className="underline" href={`/characters?race=elf`}>Elf</Link>
          <Link className="underline" href={`/characters?race=dwarf`}>Dwarf</Link>
          <Link className="underline" href={`/characters?race=gnome`}>Gnome</Link>
          <Link className="underline" href={`/characters`}>Reset</Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {characters.map((c) => (
          <article key={c.id} className="rounded border p-3">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-medium">{c.name}</h2>
              <span className="text-sm opacity-70">{c.age}</span>
            </div>

            <p className="text-sm opacity-70 mt-1">
              {c.gender} · {c.race}
            </p>

            <p className="mt-2 text-sm line-clamp-3">{c.description}</p>

            <div className="mt-3 flex gap-3 text-sm">
              <Link className="underline" href={`/characters/${c.id}`}>
                Ver
              </Link>
              <Link className="underline" href={`/characters/${c.id}/edit`}>
                Editar
              </Link>
            </div>
          </article>
        ))}

        {characters.length === 0 && (
          <p className="opacity-70">No hay personajes con esos filtros.</p>
        )}
      </section>
    </main>
  );
}
