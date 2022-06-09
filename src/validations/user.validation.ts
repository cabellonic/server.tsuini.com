// Models
import { NewUserEntry } from "../models";
// Utils
import { parseString, parseImage, parseEmail, parseNumber } from "../utils";

const toNewUserEntry = (user: any) => {
	const { spotifyId, username, email, avatar, displayName, profileUrl, spotifyPlan, rank } = user;

	const newSlide: NewUserEntry = {
		displayName: parseString(displayName),
		email: parseEmail(email),
		avatar: parseImage(avatar),
		profileUrl: parseString(profileUrl),
		spotifyPlan: parseString(spotifyPlan),
		spotifyId: parseString(spotifyId),
		username: parseString(username),
		rank: parseNumber(rank),
	};

	return newSlide;
};

export default toNewUserEntry;
