import { Request, Response, NextFunction } from 'express';
// Services
import * as albumService from './album.service';
import * as artistService from '../artist/artist.service';
import { Song } from '../song/song.model';

export const getAlbums = async (req: Request, res: Response, _next: NextFunction) => {
	const albums = await albumService.getAlbums();
	return res.json(albums);
};

export const getAlbumByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const album = await albumService.getAlbumByID(id);
	if (album && album.completed) return res.json(album);
	const albumFromSpotify = await albumService.getAlbumFromSpotify(req.session?.tokens?.access_token, id);
	if (!album) return res.json(albumFromSpotify);

	const songs: Array<Song> = albumFromSpotify.songs.map(songsFromSpotify => {
		const savedSong = album.songs.find(s => s.id === songsFromSpotify.id);
		if (Boolean(savedSong)) return savedSong;
		return songsFromSpotify;
	});
	return res.json({ ...album, songs });
};

export const getAlbumFromDB = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const album = await albumService.getAlbumByID(id);
	if (!album) return res.end();
	return res.json(album);
};

export const getAlbumFromSpotify = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const album = await albumService.getAlbumFromSpotify(req.session?.tokens?.access_token, id);
	return res.json(album);
};

export const createAlbum = async (req: Request, res: Response, _next: NextFunction) => {
	const alreadyExist = Boolean(await albumService.getAlbumByID(req.body?.id));
	if (alreadyExist) return res.status(409).json({ message: 'Entity Already Exists' });
	const createdAlbum = await albumService.createAlbum(req.body);
	return res.json(createdAlbum);
};

export const createAlbumFromZero = async (req: Request, res: Response, _next: NextFunction) => {
	const album = req.body;
	const alreadyExist = Boolean(await albumService.getAlbumByID(req.body?.id));
	if (alreadyExist) return res.status(409).json({ message: 'Entity Already Exists' });

	for (const artist of album.artists) {
		const artistAlreadyExist = Boolean(await artistService.getArtistByID(artist.id));
		if (!artistAlreadyExist) {
			const artistFromSpotify = await artistService.getArtistFromSpotify(req.session?.tokens?.access_token, artist.id);
			await artistService.createArtist({ ...artistFromSpotify, uploader: album.uploader });
		}
	}

	const createdAlbum = await albumService.createAlbum(req.body);
	return res.json(createdAlbum);
};
