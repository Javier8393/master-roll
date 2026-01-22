"use client";

import { useRouter } from "next/navigation";
import CharacterForm from "@/components/forms/CharacterForm";
import type { z } from "zod";
import { characterSchema } from "@/lib/validators";

type Character = z.infer<typeof characterSchema>;

export default function NewCharacterPage() {
  const router = useRouter();

  const handleSubmit = async (data: Character) => {
    const res = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/characters");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Crear personaje</h1>
        <p className="text-gray-500">Completa los campos para añadir un nuevo héroe</p>
      </header>
      
      <div className="bg-white border rounded p-6">
        <CharacterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}