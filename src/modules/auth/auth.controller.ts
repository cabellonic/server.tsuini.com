import axios from "axios";
import { Request, Response, NextFunction } from "express";
// Config
import * as authConfig from "./auth.config";
// Services
import * as authService from "./auth.service";
import * as userService from "../user/user.service";
// Utils
import { generateRandomString } from "../../utils";

export const getMe = async (req: Request, res: Response, _next: NextFunction) => {
	const user = req.session.user;
	const tokens = req.session.tokens;
	if (user && tokens) return res.json({ ...user });
	return res.send(null);
};

export const login = async (req: Request, res: Response, _next: NextFunction) => {
	const state = generateRandomString(16);
	const scope = authConfig.scopes.join(" ");

	res.cookie(authConfig.STATE_KEY, state);

	const authUrl =
		"https://accounts.spotify.com/authorize?" +
		new URLSearchParams({
			response_type: "code",
			client_id: process.env.SPOTIFY_CLIENT_ID,
			scope: scope,
			redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
			state: state,
		});
	return res.json({ authUrl });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	req.session.destroy((err) => {
		if (err) return next(err);
	});
	res.json({ success: true, message: "Logged out" });
};

export const authCallback = async (req: Request, res: Response, _next: NextFunction) => {
	const state = req.query.state || null;
	const code = (req.query.code as string) || null;
	const storedState = req.cookies?.[authConfig.STATE_KEY];

	if (!state || !code || state !== storedState) return res.redirect("/error/state_mismatch");

	res.clearCookie(authConfig.STATE_KEY);

	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		auth: {
			username: process.env.SPOTIFY_CLIENT_ID,
			password: process.env.SPOTIFY_CLIENT_SECRET,
		},
	};

	const data = new URLSearchParams({
		grant_type: "authorization_code",
		code: code,
		redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
	});

	try {
		const response = await axios.post(authConfig.SPOTIFY_TOKEN_URL, data, config);
		const { access_token, refresh_token, expires_in } = response.data;

		const userFromSpotify = await authService.getUserFromSpotify(access_token);
		let userFromDB = await userService.getUserByCriteria({ spotifyId: userFromSpotify.spotifyId });
		if (!userFromDB) userFromDB = await userService.createUser(userFromSpotify);

		if (!userFromDB) throw new Error("User not found");

		req.session.user = userFromDB;
		req.session.tokens = {
			access_token,
			refresh_token,
			expires_in,
		};
	} catch (error) {
		console.log(error);
	}

	return res.redirect(process.env.CLIENT_URL!);
};
