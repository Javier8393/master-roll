import { z } from "zod";

export const genderEnum = z.enum(["male", "female"]);
export const raceEnum = z.enum(["human", "elf", "dwarf", "gnome"]);

export type Gender = z.infer<typeof genderEnum>;
export type Race = z.infer<typeof raceEnum>;

export const characterSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().int().min(0).max(200),
  gender: genderEnum,
  race: raceEnum,
  description: z.string().min(10).max(500),
});

export type CharacterInput = z.infer<typeof characterSchema>;
