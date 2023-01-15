import { Playlist } from '../../models';
import * as songAdapter from '../song/song.adapter';

export const adaptPlaylistFromSpotify = (playlistFromSpotify: any): Playlist => {
	return {
		id: playlistFromSpotify.id,
		collaborative: playlistFromSpotify.collaborative,
		description: playlistFromSpotify.description,
		followers: playlistFromSpotify.followers?.total || 0,
		images: playlistFromSpotify.images?.[0].url,
		name: playlistFromSpotify.name,
		owner: {
			id: playlistFromSpotify.owner?.id,
			name: playlistFromSpotify.owner?.display_name,
		},
		public: playlistFromSpotify.public,
		total_songs: playlistFromSpotify.tracks?.total,
		songs: playlistFromSpotify.tracks?.items?.map(item => {
			return {
				...songAdapter.adaptSongFromSpotify(item?.track),
				added_at: item?.added_at,
				added_by: item?.added_by?.id,
			};
		}),
		spotifyUrl: playlistFromSpotify.href,
	};
};

export const adaptPlaylistArrayFromSpotify = (playlistArrayFromSpotify: Array<any> = []): Array<Playlist> => {
	return playlistArrayFromSpotify.map(playlist => adaptPlaylistFromSpotify(playlist));
};
