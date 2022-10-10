import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
// Config
import * as authConfig from './auth.config';
// Services
import * as authService from './auth.service';
import * as userService from '../user/user.service';
// Utils
import * as utils from '../../utils';

export const getMe = async (req: Request, res: Response, _next: NextFunction) => {
	const user_id = req.session.user_id;
	if (!user_id) return res.end();
	const user = await userService.getUserByID(user_id);
	if (user) return res.json(user);
	return res.end();
};

export const login = async (_req: Request, res: Response, _next: NextFunction) => {
	const state = utils.generateRandomString(16);
	const scope = authConfig.scopes.join(' ');

	res.cookie(authConfig.STATE_KEY, state);

	const authUrl =
		authConfig.SPOTIFY_AUTHORIZE_URL +
		new URLSearchParams({
			response_type: 'code',
			client_id: process.env.SPOTIFY_CLIENT_ID,
			scope: scope,
			redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
			state: state,
		});

	return res.json({ authUrl });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	req.session.destroy(err => {
		if (err) return next(err);
	});
	res.json({ success: true, message: 'Logged out' });
};

export const authCallback = async (req: Request, res: Response, _next: NextFunction) => {
	const state = req.query.state || null;
	const code = (req.query.code as string) || null;
	const storedState = req.cookies?.[authConfig.STATE_KEY];

	if (!state || !code || state !== storedState) throw new Error('Invalid state or code');

	res.clearCookie(authConfig.STATE_KEY);

	const config = utils.getAxiosConfig({ withSpotifyAuth: true, urlEncoded: true });

	const data = new URLSearchParams({
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
	});

	const response = await axios.post(authConfig.SPOTIFY_TOKEN_URL, data, config);
	const { access_token, refresh_token, expires_in } = response.data;

	const userFromSpotify = await authService.getUserFromSpotify(access_token);
	let userFromDB = await userService.getUserByID(userFromSpotify.id);
	if (!userFromDB) userFromDB = await userService.createUser(userFromSpotify);

	req.session.user_id = userFromSpotify.id;
	req.session.tokens = {
		access_token,
		refresh_token,
		expires_in,
	};

	return res.redirect(process.env.CLIENT_URL!);
};

export const refresh = async (req: Request, res: Response, _next: NextFunction) => {
	const refresh_token = req.session.tokens?.refresh_token;
	if (!refresh_token) throw new Error('No refresh token');

	const config = utils.getAxiosConfig({ withSpotifyAuth: true, urlEncoded: true });

	const data = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refresh_token,
	});

	const response = await axios.post(authConfig.SPOTIFY_TOKEN_URL, data, config);
	const { access_token, expires_in } = response.data;
	req.session.tokens.access_token = access_token;
	req.session.tokens.expires_in = expires_in;

	return res.json({ accessToken: access_token, expirationDate: Date.now() + expires_in * 1000 });
};
