import axios from 'axios';
// Models
import { Devices, PlaybackState } from './player.model';
// Config
import * as playerConfig from './player.config';
// Utils
import * as utils from '../../utils';

export const getPlaybackState = async (accessToken: string): Promise<PlaybackState> => {
	const config = utils.getAxiosConfig({ accessToken });

	try {
		const { data } = await axios.get(`${playerConfig.PLAYER_API_URI}`, config);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackDevice = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	await axios.put(`${playerConfig.PLAYER_API_URI}`, body, config);
};

export const setPlaybackPlay = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	try {
		await axios.put(`${playerConfig.PLAYER_API_URI}/play`, new URLSearchParams({}), config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackPause = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	try {
		await axios.put(`${playerConfig.PLAYER_API_URI}/pause`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackRepeat = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);

	try {
		await axios.put(`${playerConfig.PLAYER_API_URI}/repeat${query}`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackNext = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	try {
		await axios.post(`${playerConfig.PLAYER_API_URI}/next`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackPrevious = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });

	try {
		await axios.post(`${playerConfig.PLAYER_API_URI}/previous`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackSeek = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);

	try {
		await axios.put(`${playerConfig.PLAYER_API_URI}/seek${query}`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackShuffle = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);

	try {
		await axios.put(`${playerConfig.PLAYER_API_URI}/shuffle${query}`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const setPlaybackVolume = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);

	try {
		await axios.put(`${playerConfig.PLAYER_API_URI}/volume${query}`, null, config);
	} catch (error) {
		console.log(error);
	}
};

export const getPlaybackDevices = async (accessToken: string): Promise<Devices> => {
	const config = utils.getAxiosConfig({ accessToken });

	try {
		const { data } = await axios.get(`${playerConfig.PLAYER_API_URI}/devices`, config);
		return data;
	} catch (error) {
		console.log(error);
	}
};
