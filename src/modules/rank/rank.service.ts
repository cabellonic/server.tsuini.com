import { AppDataSource } from '../../data-source';
// Models
import { NewRankEntry, Rank } from '../../models';

const ranksRepository = AppDataSource.getRepository(Rank);

export const getRanks = async () => {
	const ranks = await ranksRepository.find();
	return ranks;
};

export const getRankByID = async (id: string) => {
	const rank = await ranksRepository.findOne({ where: { id } });
	return rank;
};

export const createRank = async (artist: NewRankEntry) => {
	const newRank = await ranksRepository.save(artist);
	return newRank;
};
