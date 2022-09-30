import { Request, Response, NextFunction } from "express";
// Services
import * as songService from "./song.service";

export const getSongs = async (_req: Request, res: Response, _next: NextFunction) => {
	const songs = await songService.getSongs();
	return res.json(songs);
};

export const getSongByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const song = await songService.getSongByID(id);
	if (!song) return res.end();
	return res.json(song);
};
