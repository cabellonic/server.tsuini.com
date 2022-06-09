import { AppDataSource } from "../data-source";
// Entities
import { MenuItem } from "../entity";
// Models
import { NewMenuItem } from "../models";

export const getMenuItems = async (): Promise<Array<MenuItem>> => {
	return await AppDataSource.getRepository(MenuItem).find({ order: { order: "ASC" } });
};

export const getMenuItemById = async (id: string): Promise<MenuItem | null> => {
	return await AppDataSource.getRepository(MenuItem).findOneBy({ id });
};

export const addMenuItem = async (newMenuItemEntry: NewMenuItem): Promise<MenuItem> => {
	const menuItemToInsert = new MenuItem();
	menuItemToInsert.order = newMenuItemEntry.order;
	menuItemToInsert.label = newMenuItemEntry.label;
	menuItemToInsert.path = newMenuItemEntry.path;
	menuItemToInsert.icon = newMenuItemEntry.icon;

	return await AppDataSource.getRepository(MenuItem).save(menuItemToInsert);
};
