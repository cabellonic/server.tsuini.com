import { Request, Response, NextFunction } from 'express';
// Services
import * as translationService from './translation.service';

export const getTranslations = async (req: Request, res: Response, _next: NextFunction) => {
	const translations = await translationService.getTranslations();
	return res.json(translations);
};

export const getTranslationByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const translation = await translationService.getTranslationByID(id);
	return res.json(translation);
};

export const getTranslationsByCriteria = async (req: Request, res: Response, _next: NextFunction) => {
	const criteria = req.query;
	const translations = await translationService.getTranslationsByCriteria(criteria);
	return res.json(translations);
};

export const createTranslation = async (req: Request, res: Response, _next: NextFunction) => {
	const translation = req.body;
	const newTranslation = await translationService.createTranslation(translation);
	return res.json(newTranslation);
};

export const updateTranslation = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const translation = req.body;
	const updatedTranslation = await translationService.updateTranslation(id, translation);
	return res.json(updatedTranslation);
};

export const deleteTranslation = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const deletedTranslation = await translationService.deleteTranslation(id);
	return res.json(deletedTranslation);
};
