import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../data-source';
// Models
import { Language, NewLanguageEntry } from '../../models';

const languageRepository = AppDataSource.getRepository(Language);

export const getLanguageByID = async (id: string) => {
	const language = await languageRepository.findOne({ where: { id } });
	return language;
};

export const getLanguageByCode = async (code: string) => {
	const language = await languageRepository.findOne({ where: { code } });
	return language;
};

export const getLanguages = async () => {
	const languages = await languageRepository.find();
	return languages;
};

export const getLanguagesByCriteria = async (criteria: FindOptionsWhere<Language> | FindOptionsWhere<Language>[]) => {
	const languages = await languageRepository.find({ where: criteria });
	return languages;
};

export const createLanguage = async (language: NewLanguageEntry) => {
	const newLanguage = await languageRepository.save(language);
	return newLanguage;
};

export const updateLanguage = async (id: string, language: NewLanguageEntry) => {
	const updatedLanguage = await languageRepository.update(id, language);
	return updatedLanguage;
};

export const deleteLanguage = async (id: string) => {
	const deletedLanguage = await languageRepository.delete(id);
	return deletedLanguage;
};
