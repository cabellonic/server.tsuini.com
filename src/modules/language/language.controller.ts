import { Request, Response, NextFunction } from 'express';
// Services
import * as languageService from './language.service';

export const getLanguages = async (req: Request, res: Response, _next: NextFunction) => {
	const languages = await languageService.getLanguages();
	return res.json({ languages });
};

export const getLanguageByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const language = await languageService.getLanguageByID(id);
	return res.json({ language });
};

export const getLanguagesByCriteria = async (req: Request, res: Response, _next: NextFunction) => {
	const criteria = req.query;
	const languages = await languageService.getLanguagesByCriteria(criteria);
	return res.json({ languages });
};

export const createLanguage = async (req: Request, res: Response, _next: NextFunction) => {
	const language = req.body;
	const newLanguage = await languageService.createLanguage(language);
	return res.json({ newLanguage });
};

export const updateLanguage = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const language = req.body;
	const updatedLanguage = await languageService.updateLanguage(id, language);
	return res.json({ updatedLanguage });
};

export const deleteLanguage = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const deletedLanguage = await languageService.deleteLanguage(id);
	return res.json({ deletedLanguage });
};
