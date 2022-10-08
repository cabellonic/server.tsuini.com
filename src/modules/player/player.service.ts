import axios from "axios";
// Models
import { Devices, PlaybackState } from "./player.model";
// Utils
import * as utils from "../../utils";

const SPOTIFY_API_URL = "https://api.spotify.com/v1/me";

export const getPlaybackState = async (accessToken: string): Promise<PlaybackState> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get(`${SPOTIFY_API_URL}/player`, config);
	return data;
};

export const setPlaybackDevice = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player`, body, config);
	return data;
};

export const setPlaybackPlay = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player/play`, null, config);
	return data;
};

export const setPlaybackPause = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player/pause`, null, config);
	return data;
};

export const setPlaybackRepeat = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player/repeat`, body, config);
	return data;
};

export const setPlaybackNext = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.post(`${SPOTIFY_API_URL}/player/next`, null, config);
	return data;
};

export const setPlaybackPrevious = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.post(`${SPOTIFY_API_URL}/player/previous`, null, config);
	return data;
};

export const setPlaybackSeek = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player/seek${query}`, null, config);
	return data;
};

export const setPlaybackShuffle = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player/shuffle`, body, config);
	return data;
};

export const setPlaybackVolume = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.put(`${SPOTIFY_API_URL}/player/volume`, body, config);
	return data;
};

export const getPlaybackDevices = async (accessToken: string): Promise<Devices> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get(`${SPOTIFY_API_URL}/player/devices`, config);
	return data;
};
