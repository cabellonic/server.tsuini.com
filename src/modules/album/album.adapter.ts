import { NewAlbumEntry, Song } from '../../models';
import * as songAdapter from '../song/song.adapter';

export const adaptAlbumFromSpotify = (albumFromSpotify: any): NewAlbumEntry => {
	return {
		id: albumFromSpotify.id,
		name: albumFromSpotify.name,
		completed: albumFromSpotify.completed,
		albumType: albumFromSpotify.album_type,
		href: albumFromSpotify.href,
		image: albumFromSpotify.images[0]?.url,
		releaseDate: albumFromSpotify.release_date,
		spotifyUrl: albumFromSpotify.external_urls.spotify,
		totalSongs: albumFromSpotify.total_tracks,
		uploader: albumFromSpotify.uploader,
		artists: albumFromSpotify.artists,
		songs: songAdapter.adaptSongArrayFromSpotify(albumFromSpotify.tracks?.items) as Array<Song>,
	};
};

export const adaptAlbumArrayFromSpotify = (albumArrayFromSpotify: Array<any> = []): Array<NewAlbumEntry> => {
	return albumArrayFromSpotify.map(album => adaptAlbumFromSpotify(album));
};
