import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { characters } from "@/db/schema";
import { and, asc, desc, eq, like, type SQL } from "drizzle-orm";
import { characterSchema, genderEnum, raceEnum } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const search = searchParams.get("search");
  const sort = searchParams.get("sort") ?? "createdAt"; // name | age | createdAt
  const dir = searchParams.get("dir") ?? "desc"; // asc | desc
  const gender = searchParams.get("gender");
  const race = searchParams.get("race");
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
