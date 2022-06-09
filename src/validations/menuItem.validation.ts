// Models
import { NewMenuItem } from "../models";
// Utils
import { parseString, parseNumber } from "../utils";

const toNewMenuItem = (slide: any) => {
	const { order, label, path, icon } = slide;

	const newSlide: NewMenuItem = {
		order: parseNumber(order),
		label: parseString(label),
		path: parseString(path),
		icon: icon ? parseString(icon) : undefined,
	};

	return newSlide;
};

export default toNewMenuItem;
