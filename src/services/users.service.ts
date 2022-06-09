import { AppDataSource } from "../data-source";
// Entities
import { User } from "../entity";

export const getUsers = async (): Promise<Array<User>> => {
	return await AppDataSource.getRepository(User).find();
};

export const getUserById = async (id: string): Promise<User | null> => {
	return await AppDataSource.getRepository(User).findOneBy({ id });
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
	return await AppDataSource.getRepository(User).findOneBy({ username });
};

export const getUserBySpotifyId = async (spotifyId: string): Promise<User | null> => {
	return await AppDataSource.getRepository(User).findOneBy({ spotifyId });
};
