import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { NewTranslationEntry, Translation } from '../../models';

const translationRepository = AppDataSource.getRepository(Translation);

export const getTranslationByID = async (id: string) => {
	const translation = await translationRepository.findOne({ where: { id } });
	return translation;
};

export const getTranslations = async () => {
	const translations = await translationRepository.find();
	return translations;
};

export const getTranslationsByCriteria = async (
	criteria: FindOptionsWhere<Translation> | FindOptionsWhere<Translation>[],
) => {
	const translations = await translationRepository.find({ where: criteria });
	return translations;
};

export const createTranslation = async (translation: NewTranslationEntry) => {
	const newTranslation = await translationRepository.save(translation);
	return newTranslation;
};

export const updateTranslation = async (id: string, translation: NewTranslationEntry) => {
	const updatedTranslation = await translationRepository.update(id, translation);
	return updatedTranslation;
};

export const deleteTranslation = async (id: string) => {
	const deletedTranslation = await translationRepository.delete(id);
	return deletedTranslation;
};
