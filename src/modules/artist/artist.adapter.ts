import { Album, NewArtistEntry } from '../../models';
import * as albumAdapter from '../album/album.adapter';

export const adaptArtistFromSpotify = (artistFromSpotify: any): NewArtistEntry => {
	return {
		id: artistFromSpotify.id,
		name: artistFromSpotify.name,
		avatar: artistFromSpotify.images[0]?.url,
		spotifyUrl: artistFromSpotify.external_urls.spotify,
		uploader: artistFromSpotify.uploader,
		albums: albumAdapter.adaptAlbumArrayFromSpotify(artistFromSpotify.albums) as Array<Album>,
	};
};
