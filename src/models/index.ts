// Entities
import { MenuItem, Slide, User } from "../entity";

export type NewMenuItem = Omit<MenuItem, "id">;
export type NewSlideEntry = Omit<Slide, "id" | "created_at" | "updated_at">;
export type NewUserEntry = Omit<User, "id">;
