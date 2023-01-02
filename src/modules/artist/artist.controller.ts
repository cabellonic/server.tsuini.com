import { Request, Response, NextFunction } from 'express';
// Service
import * as artistService from './artist.service';

export const getArtists = async (_req: Request, res: Response, _next: NextFunction) => {
	const artists = await artistService.getArtists();
	return res.json(artists);
};

export const getArtistByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const artistFromDB = await artistService.getArtistByID(id);
	if (artistFromDB) return res.json(artistFromDB);
	const artistFromSpotify = await artistService.getArtistFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(artistFromSpotify);
};

export const getArtistFromDB = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const artist = await artistService.getArtistByID(id);
	if (!artist) return res.status(404).end();
	return res.json(artist);
};

export const getArtistFromSpotify = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const artist = await artistService.getArtistFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(artist);
};

export const createArtist = async (req: Request, res: Response, _next: NextFunction) => {
	const alreadyExist = Boolean(await artistService.getArtistByID(req.body?.id));
	if (alreadyExist) return res.status(409).json({ message: 'Entity Already Exists' });
	const createdArtist = await artistService.createArtist(req.body);
	return res.json(createdArtist);
};
