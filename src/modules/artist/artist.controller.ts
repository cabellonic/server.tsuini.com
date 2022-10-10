import { Request, Response, NextFunction } from 'express';
// Service
import * as artistService from './artist.service';

export const getArtists = async (_req: Request, res: Response, _next: NextFunction) => {
	const artists = await artistService.getArtists();
	return res.json(artists);
};

export const getArtistByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const artist = await artistService.getArtistByID(id);
	if (!artist) return res.status(404).end();
	return res.json(artist);
};
