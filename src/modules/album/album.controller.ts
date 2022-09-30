import { Request, Response, NextFunction } from "express";
// Services
import * as albumService from "./album.service";

export const getAlbums = async (req: Request, res: Response, _next: NextFunction) => {
	const albums = await albumService.getAlbums();
	return res.json(albums);
};

export const getAlbumByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const album = await albumService.getAlbumByID(id);
	if (!album) return res.end();
	return res.json(album);
};
