const isString = (value: any): value is string => typeof value === "string";
const isNumber = (value: any): value is number => typeof value === "number";
const isBoolean = (value: any): value is boolean => typeof value === "boolean";
const isDateFormat = (value: any): value is string => isString(value) && Boolean(Date.parse(value));
const isImage = (value: any): value is string => typeof value === "string";
const isEmail = (value: any): value is string => {
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return isString(value) && emailRegex.test(value);
};

export const parseString = (value: any): string => {
	if (isString(value)) return value;
	throw new Error(`Expected string, got ${typeof value}`);
};

export const parseNumber = (value: any): number => {
	if (isNumber(value)) return value;
	throw new Error(`Expected number, got ${typeof value}`);
};

export const parseBoolean = (value: any): boolean => {
	if (isBoolean(value)) return value;
	throw new Error(`Expected boolean, got ${typeof value}`);
};

export const parseDate = (value: any): string => {
	if (isDateFormat(value)) return value;
	throw new Error(`Expected date format, got ${typeof value}`);
};

export const parseImage = (value: any): string => {
	if (isImage(value)) return value;
	throw new Error(`Expected image, got ${typeof value}`);
};

export const parseEmail = (value: any): string => {
	if (isEmail(value)) return value;
	throw new Error(`Expected email, got ${typeof value}`);
};
