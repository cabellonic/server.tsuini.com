import { Request, Response, NextFunction } from 'express';
// Services
import * as playerService from './player.service';

export const getPlaybackState = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.getPlaybackState(accessToken);
	return res.json(playerState);
};

export const setPlaybackDevice = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackDevice(accessToken, req.body);
	return res.json(playerState);
};

export const setPlaybackPlay = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackPlay(accessToken, req.body);
	return res.json(playerState);
};

export const setPlaybackPause = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackPause(accessToken);
	return res.json(playerState);
};

export const setPlaybackRepeat = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackRepeat(accessToken, req.body);
	return res.json(playerState);
};

export const setPlaybackNext = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackNext(accessToken);
	return res.json(playerState);
};

export const setPlaybackPrevious = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackPrevious(accessToken);
	return res.json(playerState);
};

export const setPlaybackSeek = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackSeek(accessToken, req.body);
	return res.json(playerState);
};

export const setPlaybackShuffle = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackShuffle(accessToken, req.body);
	return res.json(playerState);
};

export const setPlaybackVolume = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.setPlaybackVolume(accessToken, req.body);
	return res.json(playerState);
};

export const getPlaybackDevices = async (req: Request, res: Response, _next: NextFunction) => {
	const accessToken = req.session.tokens.access_token;
	const playerState = await playerService.getPlaybackDevices(accessToken);
	return res.json(playerState);
};
