import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const characters = sqliteTable("characters", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  race: text("race", { enum: ["human", "elf", "dwarf", "gnome"] }).notNull(),
  characterClass: text("character_class", { enum: ["warrior", "mage", "rogue", "cleric"] }).notNull(),
  description: text("description").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
