import { NewUserEntry } from '../../models';

const defaultAvatar = 'https://pbs.twimg.com/profile_images/1377489034558181378/KYCqvZi7_400x400.jpg';

export const adaptUserFromSpotify = (userFromSpotify: any): NewUserEntry => {
	return {
		id: userFromSpotify.id,
		country: userFromSpotify.country,
		username: userFromSpotify.id,
		displayName: userFromSpotify.display_name || userFromSpotify.email,
		email: userFromSpotify.email,
		avatar: userFromSpotify.images?.[0]?.url || defaultAvatar,
		profileUrl: userFromSpotify.external_urls.spotify,
		spotifyPlan: userFromSpotify.product,
		rank: null,
	};
};
