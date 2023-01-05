import axios from 'axios';
// Models
import { Devices, PlaybackState } from './player.model';
// Config
import * as playerConfig from './player.config';
// Utils
import * as utils from '../../utils';

export const getPlaybackState = async (accessToken: string): Promise<PlaybackState> => {
	const config = utils.getAxiosConfig({ accessToken });
	const { data } = await axios.get(`${playerConfig.PLAYER_API_URI}`, config);
	return data;
};

export const setPlaybackDevice = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	await axios.put(`${playerConfig.PLAYER_API_URI}`, body, config);
};

export const setPlaybackPlay = async (accessToken: string, context: any = {}): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	await axios.put(`${playerConfig.PLAYER_API_URI}/play`, context, config);
};

export const setPlaybackPause = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	await axios.put(`${playerConfig.PLAYER_API_URI}/pause`, null, config);
};

export const setPlaybackRepeat = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);
	await axios.put(`${playerConfig.PLAYER_API_URI}/repeat${query}`, null, config);
};

export const setPlaybackNext = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	await axios.post(`${playerConfig.PLAYER_API_URI}/next`, null, config);
};

export const setPlaybackPrevious = async (accessToken: string): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	await axios.post(`${playerConfig.PLAYER_API_URI}/previous`, null, config);
};

export const setPlaybackSeek = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);
	await axios.put(`${playerConfig.PLAYER_API_URI}/seek${query}`, null, config);
};

export const setPlaybackShuffle = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);
	await axios.put(`${playerConfig.PLAYER_API_URI}/shuffle${query}`, null, config);
};

export const setPlaybackVolume = async (accessToken: string, body: any): Promise<void> => {
	const config = utils.getAxiosConfig({ accessToken });
	const query = utils.getQueryString(body);
	await axios.put(`${playerConfig.PLAYER_API_URI}/volume${query}`, null, config);
};

export const getPlaybackDevices = async (accessToken: string): Promise<Devices> => {
	const config = utils.getAxiosConfig({ accessToken });
	const { data } = await axios.get(`${playerConfig.PLAYER_API_URI}/devices`, config);
	return data;
};
