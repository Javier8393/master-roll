// BLOQUE 1 PARTE SERVER

// Aqui importamos los modulos necesarios
import Link from "next/link";
import { headers } from "next/headers";

// Definimos el tipo para los parametros de busqueda
type SearchParams = Record<string, string | string[] | undefined>;

// Funcion para obtener un parametro de busqueda
function getParam(sp: SearchParams, key: string): string | undefined {
  const v = sp[key];
  if (Array.isArray(v)) return v[0];
  return v;
}
// Componente principal de la pagina de personajes
export default async function CharactersPage({
  searchParams, // Recibimos los parametros de busqueda
}: {
  searchParams: Promise<SearchParams>; // Tipo de los parametros de busqueda
}) {
  const sp = await searchParams; // Esperamos a que se resuelvan los parametros de busqueda
  // SI QUIERO CREAR UN DASHBOARD CON CLIENT COMPONENT, DEBO CAMBIAR ESTO?
  // Obtenemos los parametros de busqueda individuales

  const search = getParam(sp, "search") ?? ""; // Parametro de busqueda de texto
  const gender = getParam(sp, "gender") ?? ""; // Parametro de busqueda de genero
  const race = getParam(sp, "race") ?? "";    // Parametro de busqueda de raza
  const sort = getParam(sp, "sort") ?? "createdAt";   // Parametro de ordenacion
  const dir = getParam(sp, "dir") ?? "desc";      // Parametro de direccion de ordenacion

  const qs = new URLSearchParams(); // Creamos un objeto para los parametros de consulta
  if (search) qs.set("search", search); // Agregamos el parametro de busqueda si existe
  if (gender) qs.set("gender", gender); // Agregamos el parametro de genero si existe
  if (race) qs.set("race", race); // Agregamos el parametro de raza si existe
  if (sort) qs.set("sort", sort); // Agregamos el parametro de ordenacion si existe
  if (dir) qs.set("dir", dir);  // Agregamos el parametro de direccion si existe

  // Obtenemos los headers para construir la URL completa
  // Esto tambien lo necesito en el lado del servidor?
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  // Realizamos la peticion a la API para obtener los personajes
  const res = await fetch(`${protocol}://${host}/api/characters?${qs.toString()}`, {
    cache: "no-store",
});
// Si la respuesta no es correcta, mostramos un mensaje de error
// Esto tambien lo necesito en el lado del servidor?
  if (!res.ok) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Characters</h1>
        <p className="mt-2">Error cargando personajes (status {res.status}).</p>
      </main>
    );
  }
// Parseamos la respuesta JSON
// Esto tambien lo necesito en el lado del servidor?
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

  // -- BLOQUE 2 PARTE CLIENTE
// Renderizamos la pagina con los personajes obtenidos
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
