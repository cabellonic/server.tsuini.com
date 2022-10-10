import 'express-session';
import { User } from '../src/models';

declare module 'express-session' {
	interface SessionData {
		user: User;
		user_id: string;
		tokens: {
			access_token: string;
			refresh_token: string;
			expires_in: number;
		};
	}
}
