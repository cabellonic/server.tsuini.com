import { NewSongEntry } from '../../models';

export const adaptSongFromSpotify = (songFromSpotify: any): NewSongEntry => {
	return {
		id: songFromSpotify.id,
		name: songFromSpotify.name,
		discNumber: songFromSpotify.disc_number,
		duration: songFromSpotify.duration_ms,
		spotifyUrl: songFromSpotify.external_urls.spotify,
		trackNumber: songFromSpotify.track_number,
		artists: songFromSpotify.artists,
		album: songFromSpotify.album,
		uploader: null,
	};
};
