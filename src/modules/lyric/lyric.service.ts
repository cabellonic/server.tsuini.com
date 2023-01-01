import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../data-source';
// Models
import { Lyric, NewLyricEntry } from '../../models';

const lyricRepository = AppDataSource.getRepository(Lyric);

export const getLyricByID = async (id: string) => {
	const lyric = await lyricRepository.findOne({ where: { id }, relations: { language: true, uploader: true } });
	return lyric;
};

export const getLyrics = async () => {
	const lyrics = await lyricRepository.find({ relations: { language: true, uploader: true } });
	return lyrics;
};

export const getLyricsByCriteria = async (criteria: FindOptionsWhere<Lyric> | FindOptionsWhere<Lyric>[]) => {
	const lyrics = await lyricRepository.find({ where: criteria, relations: { language: true, uploader: true } });
	return lyrics;
};

export const createLyric = async (lyric: NewLyricEntry) => {
	const newLyric = await lyricRepository.save(lyric);
	return newLyric;
};

export const updateLyric = async (id: string, lyric: NewLyricEntry) => {
	const updatedLyric = await lyricRepository.update(id, lyric);
	return updatedLyric;
};

export const deleteLyric = async (id: string) => {
	const deletedLyric = await lyricRepository.delete(id);
	return deletedLyric;
};
