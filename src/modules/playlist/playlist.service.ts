import axios from 'axios';
// Models
import { NewPlaylistEntry, Playlist } from './playlist.model';
// Adapter
import * as playlistAdapter from './playlist.adapter';
// Utils
import * as utils from '../../utils';

export const getMyPlaylists = async (accessToken: string) => {
	const config = utils.getAxiosConfig({ accessToken });
	const { data } = await axios.get(`https://api.spotify.com/v1/me/playlists`, config);
	return playlistAdapter.adaptPlaylistArrayFromSpotify(data?.items);
};

export const getPlaylistByID = async (accessToken: string, id: string): Promise<Playlist> => {
	const config = utils.getAxiosConfig({ accessToken });
	const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, config);
	return playlistAdapter.adaptPlaylistFromSpotify(data);
};

export const getUserPlaylists = async (accessToken: string, userId: string): Promise<Array<Playlist>> => {
	const config = utils.getAxiosConfig({ accessToken });
	const { data } = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, config);
	return playlistAdapter.adaptPlaylistArrayFromSpotify(data?.items);
};

export const createPlaylist = async (accessToken: string, userId: string, playlist: NewPlaylistEntry) => {
	const config = utils.getAxiosConfig({ accessToken });
	const { data } = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, playlist, config);
	return data;
};
