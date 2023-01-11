import { Request, Response, NextFunction } from 'express';
// Services
import * as songService from './song.service';
import * as artistService from '../artist/artist.service';
import * as albumService from '../album/album.service';
import * as albumAdapter from '../album/album.adapter';

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

export const createSongFromZero = async (req: Request, res: Response, _next: NextFunction) => {
	const song = req.body;
	const alreadyExist = Boolean(await songService.getSongByID(req.body?.id));
	if (alreadyExist) return res.status(409).json({ message: 'Entity Already Exists' });

	for (const artist of song.artists) {
		const artistAlreadyExist = Boolean(await artistService.getArtistByID(artist.id));
		if (!artistAlreadyExist) {
			const artistFromSpotify = await artistService.getArtistFromSpotify(req.session?.tokens?.access_token, artist.id);
			await artistService.createArtist({ ...artistFromSpotify, uploader: song.uploader });
		}
	}

	const album = albumAdapter.adaptAlbumFromSpotify(song.album);
	const albumAlreadyExist = Boolean(await albumService.getAlbumByID(album.id));
	if (!albumAlreadyExist) {
		await albumService.createAlbum({ ...album, uploader: song.uploader, completed: +album.totalSongs === 1 });
	}

	await songService.createSong(song);

	return res.json(song);
};
