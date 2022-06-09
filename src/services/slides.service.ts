import { AppDataSource } from "../data-source";
// Entities
import { Slide } from "../entity";
// Models
import { NewSlideEntry } from "../models";

export const getSlides = async (): Promise<Array<Slide>> => {
	return await AppDataSource.getRepository(Slide).find({ take: 5 });
};

export const getSlideById = async (id: string): Promise<Slide | null> => {
	return await AppDataSource.getRepository(Slide).findOneBy({ id });
};

export const addSlide = async (newSlideEntry: NewSlideEntry): Promise<Slide> => {
	const slideToInsert = new Slide();

	slideToInsert.title = newSlideEntry.title;
	slideToInsert.description = newSlideEntry.description;
	slideToInsert.image = newSlideEntry.image;
	slideToInsert.link = newSlideEntry.link;
	slideToInsert.imageOnly = newSlideEntry.imageOnly;
	slideToInsert.imageMobile = newSlideEntry.imageMobile;
	slideToInsert.button = newSlideEntry.button;

	return await AppDataSource.getRepository(Slide).save(slideToInsert);
};
