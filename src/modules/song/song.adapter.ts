import { Album, NewSongEntry } from '../../models';
import * as albumAdapter from '../album/album.adapter';

export const adaptSongFromSpotify = (songFromSpotify: any): NewSongEntry => {
	return {
		id: songFromSpotify.id,
		name: songFromSpotify.name,
		discNumber: songFromSpotify.disc_number,
		duration: songFromSpotify.duration_ms,
		spotifyUrl: songFromSpotify.external_urls.spotify,
		trackNumber: songFromSpotify.track_number,
		artists: songFromSpotify.artists,
		album: songFromSpotify.album ? (albumAdapter.adaptAlbumFromSpotify(songFromSpotify.album) as Album) : null,
		uploader: songFromSpotify.uploader,
	};
};

export const adaptSongArrayFromSpotify = (songArrayFromSpotify: Array<any> = []): Array<NewSongEntry> => {
	return songArrayFromSpotify.map(song => adaptSongFromSpotify(song));
};
