import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { characters } from "@/db/schema";
import { and, asc, desc, eq, like, type SQL } from "drizzle-orm";
import { characterSchema, genderEnum, raceEnum, characterClassEnum } from "@/lib/validators";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const search = (url.searchParams.get("search") ?? "").trim();
  const sort = url.searchParams.get("sort") ?? "createdAt"; // name | age | createdAt
  const dir = url.searchParams.get("dir") ?? "desc"; // asc | desc
  const gender = url.searchParams.get("gender");
  const race = url.searchParams.get("race");
  const characterClass = url.searchParams.get("characterClass");

  const whereParts: SQL[] = [];

  if (search) whereParts.push(like(characters.name, `%${search}%`));

  if (gender) {
    const g = genderEnum.safeParse(gender);
    if (g.success) whereParts.push(eq(characters.gender, g.data));
  }

  if (race) {
    const r = raceEnum.safeParse(race);
    if (r.success) whereParts.push(eq(characters.race, r.data));
  }

  if (characterClass) {
    const c = characterClassEnum.safeParse(characterClass);
    if (c.success) whereParts.push(eq(characters.characterClass, c.data));
  }

  const where = whereParts.length ? and(...whereParts) : undefined;

  const orderExpr =
    sort === "name" ? characters.name :
    sort === "age" ? characters.age :
    characters.createdAt;

  const rows = await db
    .select()
    .from(characters)
    .where(where)
    .orderBy(dir === "asc" ? asc(orderExpr) : desc(orderExpr));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const parsed = characterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation error", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const now = new Date();

  const inserted = await db
    .insert(characters)
    .values({ ...parsed.data, createdAt: now, updatedAt: now })
    .returning();

  return NextResponse.json(inserted[0], { status: 201 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const characterId = parseInt(id);

  if (isNaN(characterId)) {
    return NextResponse.json(
      { message: "ID inválido" },
      { status: 400 }
    );
  }

  try {
    const deleted = await db
      .delete(characters)
      .where(eq(characters.id, characterId))
      .returning();

    if (!deleted.length) {
      return NextResponse.json(
        { message: "Personaje no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Personaje eliminado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error al eliminar" },
      { status: 500 }
    );
  }
}