import { User as UserEntity } from "./src/entity";
import session from "express-session";

declare module "express-session" {
	export interface SessionData {
		user: UserEntity;
		tokens: {
			accessToken: string;
			refreshToken: string;
			expirationDate: number;
		};
	}
}
