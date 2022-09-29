import "express-session";

declare module "express-session" {
	interface SessionData {
		user: any;
		tokens: {
			access_token: string;
			refresh_token: string;
			expires_in: number;
		};
	}
}
