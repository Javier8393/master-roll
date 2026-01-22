# Characters Hub 🎭

Una aplicación web para gestionar un catálogo de personajes RPG con filtrado, búsqueda y gestión completa CRUD.

## Stack Tecnológico

- **Frontend**: React 19 + Next.js 16
- **Estilos**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Base de Datos**: SQLite + Drizzle ORM
- **Validación**: Zod
- **Tipado**: TypeScript 5

## Getting Started

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build

```bash
pnpm build
pnpm start
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/                     # Rutas y layout de Next.js
│   ├── page.tsx            # Página principal
│   ├── layout.tsx          # Layout base
│   ├── characters/         # Ruta /characters
│   └── api/                # Endpoints API
│       └── characters/
│           ├── route.ts    # GET/POST
│           └── [id]/
│               └── route.ts # GET/PUT/DELETE individual
├── components/             # Componentes React
│   ├── catalog/            # Componentes de catálogo
│   │   ├── Card.tsx        # Tarjeta de personaje
│   │   ├── Grid.tsx        # Grid de personajes
│   │   ├── Delete.tsx      # Botón eliminar
│   │   └── Favourite.tsx   # Botón favoritos
│   ├── dashboard/          # Panel de control
│   │   ├── Catalog.tsx     # Gestión de catálogo
│   │   ├── SearchBar.tsx   # Búsqueda
│   │   └── ControlBar.tsx  # Filtros y ordenamiento
│   └── layout/             # Componentes de layout
│       └── Layout.tsx      # Wrapper principal
├── db/                     # Base de datos
│   ├── schema.ts           # Definición de tablas (Drizzle)
│   ├── index.ts            # Conexión a BD
│   └── migrations/         # Migraciones SQL
├── lib/                    # Utilidades
│   └── validators.ts       # Esquemas Zod
└── styles/                 # Estilos globales
    └── globals.css         # CSS global + Tailwind
```

---

## 🔧 Guía de Desarrollo

### Añadir un nuevo campo a un personaje

**Caso de uso**: Agregar un campo `alignment` (alineación moral) a la tabla de personajes.

#### 1️⃣ Modificar el esquema de BD
Archivo: `src/db/schema.ts`
```typescript
export const characters = sqliteTable("characters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  // ... campos existentes
  alignment: text("alignment", { 
    enum: ["lawful-good", "neutral", "chaotic-evil"] 
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
```

#### 2️⃣ Generar migración
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```
Esto crea un archivo SQL en `src/db/migrations/`

#### 3️⃣ Actualizar validadores
Archivo: `src/lib/validators.ts`
```typescript
export const alignmentEnum = z.enum(["lawful-good", "neutral", "chaotic-evil"]);
export type Alignment = z.infer<typeof alignmentEnum>;

export const characterSchema = z.object({
  // ... campos existentes
  alignment: alignmentEnum,
});
```

#### 4️⃣ Actualizar tipo de personaje
Archivo: `src/components/dashboard/Catalog.tsx`
```typescript
export type Character = {
  id: number;
  name: string;
  // ... campos existentes
  alignment: "lawful-good" | "neutral" | "chaotic-evil";
  createdAt: Date;
  updatedAt: Date;
};
```

#### 5️⃣ Actualizar componentes de UI
- **Mostrar**: `src/components/catalog/Card.tsx` → Añadir badge con traducción
- **Crear/Editar**: Crear formulario en `src/components/dashboard/`

#### 6️⃣ Actualizar API
Archivo: `src/app/api/characters/route.ts`
```typescript
// POST: Validar con characterSchema (incluye alignment)
// GET: Retornar el campo alignment
```

---

### Añadir un nuevo filtro en el catálogo

**Caso de uso**: Permitir filtrar por alineación.

#### 1️⃣ Actualizar tipos de filtro
Archivo: `src/components/dashboard/Catalog.tsx`
```typescript
export type CatalogFilters = {
  search: string;
  gender: "" | "male" | "female";
  race: "" | "human" | "elf" | "dwarf" | "gnome";
  characterClass: "" | "mage" | "rogue" | "warrior";
  alignment: "" | "lawful-good" | "neutral" | "chaotic-evil"; // Nuevo
  sort: "createdAt" | "name" | "age";
  dir: "asc" | "desc";
};
```

#### 2️⃣ Crear componente de filtro
Archivo: `src/components/dashboard/AlignmentFilter.tsx` (nuevo archivo)
```typescript
"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AlignmentFilter({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Todas las alineaciones</option>
      <option value="lawful-good">Bueno legal</option>
      <option value="neutral">Neutral</option>
      <option value="chaotic-evil">Malvado caótico</option>
    </select>
  );
}
```

#### 3️⃣ Integrar en ControlBar
Archivo: `src/components/dashboard/ControlBar.tsx` → Importar y usar el nuevo componente

#### 4️⃣ Actualizar endpoint API
Archivo: `src/app/api/characters/route.ts` → Añadir filtrado por alignment en la query

---

### Añadir una nueva tabla a la BD

**Caso de uso**: Crear tabla de "Equipamiento" relacionada con personajes.

#### 1️⃣ Definir esquema
Archivo: `src/db/schema.ts`
```typescript
export const equipment = sqliteTable("equipment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  rarity: text("rarity", { enum: ["common", "rare", "legendary"] }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
```

#### 2️⃣ Generar migración
```bash
pnpm drizzle-kit generate
```

#### 3️⃣ Crear API endpoints
- `src/app/api/characters/[id]/equipment/route.ts` (GET, POST)
- `src/app/api/equipment/[id]/route.ts` (PUT, DELETE)

#### 4️⃣ Crear componentes para visualizar/gestionar
- `src/components/equipment/EquipmentCard.tsx`
- `src/components/equipment/EquipmentForm.tsx`

---

## 📋 Checklist para nuevas features

- [ ] Actualizar `src/db/schema.ts` (BD)
- [ ] Generar migración: `pnpm drizzle-kit generate`
- [ ] Actualizar `src/lib/validators.ts` (validación)
- [ ] Actualizar `src/components/dashboard/Catalog.tsx` (tipos)
- [ ] Crear/actualizar componentes React necesarios
- [ ] Actualizar/crear endpoints en `src/app/api/`
- [ ] Actualizar UI para mostrar/editar nuevos campos
- [ ] Probar en desarrollo: `pnpm dev`

---

## 🚀 Comandos útiles

```bash
# Desarrollo
pnpm dev              # Iniciar servidor de desarrollo

# Build y deploy
pnpm build            # Generar build
pnpm start            # Ejecutar en producción

# Linting
pnpm lint             # Ejecutar ESLint

# Base de datos
pnpm drizzle-kit generate    # Generar migraciones
pnpm drizzle-kit push        # Aplicar migraciones a BD
pnpm drizzle-kit studio      # Abrir UI para gestionar BD
```

---

## 📚 Recursos útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Zod Validation](https://zod.dev)
