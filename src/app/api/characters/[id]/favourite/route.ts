import { db } from "@/db";
import { characters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  try {
    const { id: idRaw } = await params;
    const characterId = parseInt(idRaw);

    if (isNaN(characterId) || characterId <= 0) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    // Obtener estado actual
    const character = await db.query.characters.findFirst({
      where: eq(characters.id, characterId),
    });

    if (!character) {
      return NextResponse.json(
        { error: "Personaje no encontrado" },
        { status: 404 }
      );
    }

    // Toggle: cambiar 0→1 o 1→0
    const newFavouriteState = character.isFavourite === 0 ? 1 : 0;
    
    console.log(`Actualizando personaje ${characterId}: isFavourite ${character.isFavourite} → ${newFavouriteState}`);

    await db
      .update(characters)
      .set({ isFavourite: newFavouriteState })
      .where(eq(characters.id, characterId));
    
    console.log(`✅ Personaje ${characterId} actualizado`);

    return NextResponse.json({
      success: true,
      isFavourite: newFavouriteState === 1,
    });
  } catch (error) {
    console.error("Error updating favourite:", error);
    return NextResponse.json(
      { error: "Error al actualizar favorito" },
      { status: 500 }
    );
  }
}