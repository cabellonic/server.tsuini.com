import { User } from "../modules/user/user.model";
export { Session } from "../modules/session/session.model";

export { User };

export type NewUserEntry = Omit<User, "id" | "created_at" | "updated_at">;
