import { AppDataSource } from "../data-source";
import { spotifyApi } from "../spotify";
// Entities
import { User } from "../entity";
// Models
import { NewUserEntry } from "../models";

export const getAuthorizeURL = (): string => {
	const scopes = [
		"app-remote-control",
		"streaming",
		"user-read-email",
		"user-read-private",
		"user-top-read",
		"user-library-read",
		"user-library-modify",
		"user-read-recently-played",
		"user-read-currently-playing",
		"user-read-playback-state",
		"user-modify-playback-state",
		"playlist-read-collaborative",
	];
	const state = "";
	const showDialog = false;

	return spotifyApi.createAuthorizeURL(scopes, state, showDialog);
};

export const getAccessTokenExpirationDate = (expires_in: number) => {
	return new Date(Date.now() + expires_in * 1000).getTime();
};

export const setAccessToken = (accessToken: string) => spotifyApi.setAccessToken(accessToken);
export const setRefreshToken = (refreshToken: string) => spotifyApi.setRefreshToken(refreshToken);

export const setTokens = async (accessToken: string, refreshToken: string) => {
	setAccessToken(accessToken);
	setRefreshToken(refreshToken);
};

export const getTokens = async (code: string) => {
	const data = await spotifyApi.authorizationCodeGrant(code);
	const { access_token, refresh_token, expires_in } = data.body;
	spotifyApi.setAccessToken(access_token);
	const expirationDate = getAccessTokenExpirationDate(expires_in);

	return {
		accessToken: access_token,
		refreshToken: refresh_token,
		expirationDate,
	};
};

export const refreshTokens = async (refreshToken: string) => {
	setRefreshToken(refreshToken);
	const data = await spotifyApi.refreshAccessToken();
	const { access_token, expires_in } = data.body;
	const expirationDate = getAccessTokenExpirationDate(expires_in);
	setAccessToken(access_token);

	return {
		accessToken: access_token,
		refreshToken,
		expirationDate,
	};
};

export const createUser = async (newUserEntry: NewUserEntry): Promise<User> => {
	const userToInsert = new User();

	userToInsert.spotifyId = newUserEntry.spotifyId;
	userToInsert.username = newUserEntry.username;
	userToInsert.email = newUserEntry.email;
	userToInsert.avatar = newUserEntry.avatar;
	userToInsert.displayName = newUserEntry.displayName;
	userToInsert.profileUrl = newUserEntry.profileUrl;
	userToInsert.spotifyPlan = newUserEntry.spotifyPlan;

	return await AppDataSource.getRepository(User).save(newUserEntry);
};

export const getUserFromSpotify = async () => {
	const data = await spotifyApi.getMe();
	return data.body;
};
