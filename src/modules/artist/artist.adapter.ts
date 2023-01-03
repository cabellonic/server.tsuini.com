import { NewArtistEntry } from '../../models';

export const adaptArtistFromSpotify = (data: any): NewArtistEntry => {
	return {
		id: data.id,
		name: data.name,
		avatar: data.images[0]?.url,
		spotifyUrl: data.external_urls.spotify,
		uploader: null,
	};
};
