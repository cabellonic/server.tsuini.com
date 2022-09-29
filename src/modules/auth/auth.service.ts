import axios from "axios";
// Adapter
import * as authAdapter from "./auth.adapters";

export const getUserFromSpotify = async (accessToken: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const { data } = await axios.get("https://api.spotify.com/v1/me", config);
	return authAdapter.adaptUserFromSpotify(data);
};
