import { User } from "../src/models";

declare module "express-session" {
	interface SessionData {
		user: User;
		tokens: {
			access_token: string;
			refresh_token: string;
			expires_in: number;
		};
	}
}
