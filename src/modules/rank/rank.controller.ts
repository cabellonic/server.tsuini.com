import { Request, Response, NextFunction } from 'express';
// Service
import * as rankService from './rank.service';

export const getRanks = async (_req: Request, res: Response, _next: NextFunction) => {
	const artists = await rankService.getRanks();
	return res.json(artists);
};

export const createRank = async (req: Request, res: Response, _next: NextFunction) => {
	const rank = req.body;
	const newLyric = await rankService.createRank(rank);
	return res.json(newLyric);
};
