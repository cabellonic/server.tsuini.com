import { Request, Response, NextFunction } from 'express';
// Services
import * as albumService from './album.service';

export const getAlbums = async (req: Request, res: Response, _next: NextFunction) => {
	const albums = await albumService.getAlbums();
	return res.json(albums);
};

export const getAlbumByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const album = await albumService.getAlbumByID(id);
	if (album) return res.json(album);
	const albumFromSpotify = await albumService.getAlbumFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(albumFromSpotify);
};

export const getAlbumFromDB = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const album = await albumService.getAlbumByID(id);
	if (!album) return res.end();
	return res.json(album);
};

export const getAlbumFromSpotify = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const artist = await albumService.getAlbumFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(artist);
};

export const createAlbum = async (req: Request, res: Response, _next: NextFunction) => {
	const alreadyExist = Boolean(await albumService.getAlbumByID(req.body?.id));
	if (alreadyExist) return res.status(409).json({ message: 'Entity Already Exists' });
	const createdArtist = await albumService.createAlbum(req.body);
	return res.json(createdArtist);
};
