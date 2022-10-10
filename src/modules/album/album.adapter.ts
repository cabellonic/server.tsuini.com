import { NewAlbumEntry } from '../../models';

export const adaptAlbumFromSpotify = (albumFromSpotify: any): NewAlbumEntry => {
	return {
		id: albumFromSpotify.id,
		name: albumFromSpotify.name,
		albumType: albumFromSpotify.album_type,
		href: albumFromSpotify.href,
		image: albumFromSpotify.images[0]?.url,
		releaseDate: albumFromSpotify.release_date,
		spotifyUrl: albumFromSpotify.external_urls.spotify,
		totalSongs: albumFromSpotify.total_tracks,
	};
};
