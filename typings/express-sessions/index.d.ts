import { User } from "../../src/models";

declare module "express-session" {
	export interface SessionData {
		user: User;
		tokens: {
			access_token: string;
			refresh_token: string;
			expires_in: number;
		};
	}
}
