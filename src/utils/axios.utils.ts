import { AxiosRequestConfig } from 'axios';

type PropsAxiosConfig = {
	withSpotifyAuth?: boolean;
	accessToken?: string;
	urlEncoded?: boolean;
};

export const getAxiosConfig = ({
	withSpotifyAuth,
	accessToken,
	urlEncoded,
}: PropsAxiosConfig): AxiosRequestConfig<URLSearchParams> => {
	const Authorization = accessToken ? `Bearer ${accessToken}` : undefined;
	const auth = withSpotifyAuth && {
		username: process.env.SPOTIFY_CLIENT_ID,
		password: process.env.SPOTIFY_CLIENT_SECRET,
	};
	const headers = {
		'Content-Type': urlEncoded ? 'application/x-www-form-urlencoded' : 'application/json',
		Authorization,
	};

	return {
		headers,
		auth,
	};
};
