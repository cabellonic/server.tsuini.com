import { Request, Response, NextFunction } from "express";
// Services
import * as authService from "../services/auth.service";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.session.user;
	const tokens = req.session.tokens;

	if (!user || !tokens) return res.redirect("/api/auth/failed");

	try {
		if (new Date().getTime() + 1000 * 60 * 10 >= tokens.expirationDate) {
			const { accessToken, refreshToken, expirationDate } = await authService.refreshTokens(
				tokens.refreshToken
			);
			tokens.accessToken = accessToken;
			tokens.refreshToken = refreshToken ? refreshToken : tokens.refreshToken;
			tokens.expirationDate = expirationDate;
		} else {
			await authService.setTokens(tokens.accessToken, tokens.refreshToken);
		}
	} catch (err) {
		console.log("Something went wrong!", err);
		return res.redirect("/api/auth/failed");
	}

	return next();
};
