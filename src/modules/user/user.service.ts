import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../data-source';
// Models
import { NewUserEntry, User } from '../../models';

const userRepository = AppDataSource.getRepository(User);

export const getUserByID = async (id: string) => {
	const user = await userRepository.findOne({ where: { id }, relations: { translations: true } });
	return user;
};

export const getUserByCriteria = async (criteria: FindOptionsWhere<User> | Array<FindOptionsWhere<User>>) => {
	const user = await userRepository.findOne({ where: criteria, relations: { translations: true } });
	return user;
};

export const getUsers = async () => {
	const users = await userRepository.find();
	return users;
};

export const getUsersByCriteria = async (criteria: FindOptionsWhere<User> | Array<FindOptionsWhere<User>>) => {
	const user = await userRepository.find({ where: criteria, relations: { translations: true } });
	return user;
};

export const createUser = async (user: NewUserEntry) => {
	const newUser = await userRepository.save(user);
	return newUser;
};
