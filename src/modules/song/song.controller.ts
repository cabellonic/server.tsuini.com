import { Request, Response, NextFunction } from 'express';
// Services
import * as songService from './song.service';

export const getSongs = async (_req: Request, res: Response, _next: NextFunction) => {
	const songs = await songService.getSongs();
	return res.json(songs);
};

export const getSongByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const song = await songService.getSongByID(id);
	if (song) return res.json(song);
	const songFromSpotify = await songService.getSongFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(songFromSpotify);
};

export const getSongFromDB = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const song = await songService.getSongByID(id);
	if (!song) return res.status(404).end();
	return res.json(song);
};

export const getSongFromSpotify = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const song = await songService.getSongFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(song);
};

export const createSong = async (req: Request, res: Response, _next: NextFunction) => {
	const alreadyExist = Boolean(await songService.getSongByID(req.body?.id));
	if (alreadyExist) return res.status(409).json({ message: 'Entity Already Exists' });
	const createdSong = await songService.createSong(req.body);
	return res.json(createdSong);
};
