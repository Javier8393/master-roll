"use client";

import { useState } from "react";
import { Save, Sparkles, Loader2, User, Calendar, Users, Wand2, Sword, FileText, AlertCircle } from "lucide-react";
import { characterSchema } from "@/lib/validators";
import type { z } from "zod";

type Character = z.infer<typeof characterSchema>;

interface CharacterFormProps {
  initialData?: Partial<Character> & { id?: number };
  onSubmit: (data: Character) => Promise<void>;
  isLoading?: boolean;
}

// Estilos base
const formStyles = {
  container: "space-y-6",
  row: "grid grid-cols-1 md:grid-cols-2 gap-4",
  fieldGroup: "flex flex-col gap-2",
  label: "text-sm font-semibold text-gray-700 flex items-center gap-2",
  input: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400focus:outline-none focus:border-blue-500 focus:bg-white transition-colors",
  select: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer",
  textarea: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none",
  error: "flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-00 rounded-lg px-4 py-3",
  button: "w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors",
} as const;

export default function CharacterForm({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}: CharacterFormProps) {
  const [formData, setFormData] = useState<Partial<Character>>(initialData || {});
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = characterSchema.safeParse(formData);
    if (!parsed.success) {
      setError("Por favor, completa todos los campos requeridos");
      return;
    }

    try {
      await onSubmit(parsed.data);
    } catch {
      setError("Error al guardar el personaje");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.container}>
      {/* Nombre y Edad en fila */}
      <div className={formStyles.row}>
        <div className={formStyles.fieldGroup}>
          <label className={formStyles.label}>
            <User className="w-4 h-4 text-gray-500" /> Nombre
          </label>
          <input 
            type="text" 
            placeholder="Nombre del personaje"
            value={formData.name || ""}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={formStyles.input}
          />
        </div>
        
        <div className={formStyles.fieldGroup}>
          <label className={formStyles.label}>
            <Calendar className="w-4 h-4 text-gray-500" /> Edad
          </label>
          <input 
            type="number" 
            placeholder="Edad en años"
            value={formData.age || ""}
            onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
            className={formStyles.input}
          />
        </div>
      </div>

      {/* Género y Raza en fila */}
      <div className={formStyles.row}>
        <div className={formStyles.fieldGroup}>
          <label className={formStyles.label}>
            <Users className="w-4 h-4 text-gray-500" /> Género
          </label>
          <select 
            value={formData.gender || ""}
            onChange={(e) => setFormData({...formData, gender: e.target.value as "male" | "female"})}
            className={formStyles.select}
          >
            <option value="">Selecciona género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>

        <div className={formStyles.fieldGroup}>
          <label className={formStyles.label}>
            <Wand2 className="w-4 h-4 text-gray-500" /> Raza
          </label>
          <select 
            value={formData.race || ""}
            onChange={(e) => setFormData({...formData, race: e.target.value as "human" | "elf" | "dwarf" | "gnome"})}
            className={formStyles.select}
          >
            <option value="">Selecciona raza</option>
            <option value="human">Humano</option>
            <option value="elf">Elfo</option>
            <option value="dwarf">Enano</option>
            <option value="gnome">Gnomo</option>
          </select>
        </div>
      </div>

      {/* Clase sola */}
      <div className={formStyles.fieldGroup}>
        <label className={formStyles.label}>
          <Sword className="w-4 h-4 text-gray-500" /> Clase
        </label>
        <select 
          value={formData.characterClass || ""}
          onChange={(e) => setFormData({...formData, characterClass: e.target.value as "warrior" | "mage" | "rogue"})}
          className={formStyles.select}
        >
          <option value="">Selecciona clase</option>
          <option value="warrior">Guerrero</option>
          <option value="mage">Mago</option>
          <option value="rogue">Pícaro</option>
        </select>
      </div>

      {/* Descripción */}
      <div className={formStyles.fieldGroup}>
        <label className={formStyles.label}>
          <FileText className="w-4 h-4 text-gray-500" /> Descripción
        </label>
        <textarea 
          placeholder="Describe la historia, personalidad o habilidades de tu personaje..."
          value={formData.description || ""}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={5}
          className={formStyles.textarea}
        />
      </div>

      {error && (
        <div className={formStyles.error}>
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={isLoading}
        className={`${formStyles.button} flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : initialData?.id ? (
          <><Save className="w-5 h-5" /> Actualizar personaje</>
        ) : (
          <><Sparkles className="w-5 h-5" /> Crear personaje</>
        )}
      </button>
    </form>
  );
}