// Models
import { NewSlideEntry } from "../models";
// Utils
import { parseString, parseBoolean, parseImage } from "../utils";

const toNewSlideEntry = (slide: any) => {
	const { title, image, link, description, imageOnly, imageMobile, button } = slide;

	const newSlide: NewSlideEntry = {
		title: parseString(title),
		description: parseString(description),
		image: parseImage(image),
		link: parseString(link),
		imageOnly: parseBoolean(imageOnly),
		imageMobile: imageMobile ? parseImage(imageMobile) : undefined,
		button: button ? parseString(button) : undefined,
	};

	return newSlide;
};

export default toNewSlideEntry;
