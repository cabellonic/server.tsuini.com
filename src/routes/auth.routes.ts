import express from "express";
import dotenv from "dotenv";
// Models
import { NewUserEntry } from "../models";
// Services
import * as authService from "../services/auth.service";
import * as userService from "../services/users.service";
// Middlewares
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = express.Router();
dotenv.config();

router.get("/check", isAuthenticated, (req, res) => {
	const user = req.session.user;
	const tokens = req.session.tokens;
	if (user && tokens) return res.json({ success: true, user, tokens });
	return res.json({ success: false, message: "Not authenticated" });
});

router.get("/failed", (_req, res) => {
	res.status(401).json({
		success: false,
		message: "Login failed",
	});
});

router.get("/logout", (req, res, next) => {
	req.session.destroy((err) => {
		if (err) return next(err);
		res.redirect(process.env.CLIENT_URL!);
	});
});

router.get("/spotify/login", (_req, res) => {
	const authorizeURL = authService.getAuthorizeURL();
	return res.json({ authorizeURL });
});

router.get("/spotify/callback", async (req, res) => {
	const code = req.query.code as string;

	try {
		const { accessToken, refreshToken, expirationDate } = await authService.getTokens(code);
		await authService.setTokens(accessToken, refreshToken);

		const userFromSpotify = await authService.getUserFromSpotify();
		let user = await userService.getUserBySpotifyId(userFromSpotify.id);

		if (!user) {
			const defaultAvatar =
				"https://pbs.twimg.com/profile_images/1377489034558181378/KYCqvZi7_400x400.jpg";
			const newUser: NewUserEntry = {
				spotifyId: userFromSpotify.id,
				country: userFromSpotify.country,
				username: userFromSpotify.id,
				displayName: userFromSpotify.display_name || userFromSpotify.email,
				email: userFromSpotify.email,
				avatar: userFromSpotify.images?.[0].url || defaultAvatar,
				profileUrl: userFromSpotify.external_urls.spotify,
				spotifyPlan: userFromSpotify.product,
				rank: 2,
			};
			user = await authService.createUser(newUser);
		}

		req.session.user = user;
		req.session.tokens = {
			accessToken,
			refreshToken,
			expirationDate,
		};

		return res.redirect(process.env.CLIENT_URL!);
	} catch (err) {}
});

export default router;
