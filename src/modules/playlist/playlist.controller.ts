import { Request, Response, NextFunction } from 'express';
// Services
import * as playlistService from './playlist.service';

export const getMyPlaylists = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playlist = await playlistService.getMyPlaylists(accessToken);
	return res.json(playlist);
};

export const getPlaylistByID = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playlist = await playlistService.getPlaylistByID(accessToken, req.params.id);
	return res.json(playlist);
};

export const getUserPlaylists = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playlist = await playlistService.getUserPlaylists(accessToken, req.params.userId);
	return res.json(playlist);
};

export const createPlaylist = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playlist = await playlistService.createPlaylist(accessToken, req.params.userId, req.body);
	return res.json(playlist);
};
