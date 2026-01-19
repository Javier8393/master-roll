import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { characters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { characterSchema } from "@/lib/validators";

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Ctx) {
  const { id: idRaw } = await params;
  const id = parseId(idRaw);
  if (!id) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const rows = await db.select().from(characters).where(eq(characters.id, id));
  if (!rows[0]) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(rows[0]);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { id: idRaw } = await params;
  const id = parseId(idRaw);
  if (!id) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  const parsed = characterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation error", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const updated = await db
    .update(characters)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(characters.id, id))
    .returning();

  if (!updated[0]) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(updated[0]);
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  const { id: idRaw } = await params;
  const id = parseId(idRaw);
  if (!id) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const deleted = await db.delete(characters).where(eq(characters.id, id)).returning();
  if (!deleted[0]) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
