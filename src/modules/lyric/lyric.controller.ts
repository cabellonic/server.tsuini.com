import { Request, Response, NextFunction } from 'express';
// Services
import * as lyricService from './lyric.service';

export const getLyrics = async (req: Request, res: Response, _next: NextFunction) => {
	const lyrics = await lyricService.getLyrics();
	return res.json(lyrics);
};

export const getLyricByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const lyric = await lyricService.getLyricByID(id);
	return res.json(lyric);
};

export const getLyricsByCriteria = async (req: Request, res: Response, _next: NextFunction) => {
	const criteria = req.query;
	const lyrics = await lyricService.getLyricsByCriteria(criteria);
	return res.json(lyrics);
};

export const createLyric = async (req: Request, res: Response, _next: NextFunction) => {
	const lyric = req.body;
	const newLyric = await lyricService.createLyric(lyric);
	return res.json(newLyric);
};

export const updateLyric = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const lyric = req.body;
	const updatedLyric = await lyricService.updateLyric(id, lyric);
	return res.json(updatedLyric);
};

export const deleteLyric = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const deletedLyric = await lyricService.deleteLyric(id);
	return res.json(deletedLyric);
};
