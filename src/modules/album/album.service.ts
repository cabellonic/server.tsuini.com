import axios from 'axios';
import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../data-source';
// Models
import { Album, NewAlbumEntry } from './album.model';
// Adapter
import * as albumAdapter from './album.adapter';
// Utils
import * as utils from '../../utils';

const albumRepository = AppDataSource.getRepository(Album);

export const getAlbums = async () => {
	const albums = await albumRepository.find({
		relations: { uploader: true, artists: true, songs: { uploader: true }, translations: true },
	});
	return albums;
};

export const getAlbumByID = async (id: string) => {
	const album = await albumRepository.findOne({
		where: { id },
		relations: { uploader: true, artists: true, songs: { uploader: true }, translations: true },
	});
	return album;
};

export const getAlbumsByCriteria = async (criteria: FindOptionsWhere<Album> | Array<FindOptionsWhere<Album>>) => {
	const albums = await albumRepository.find({
		where: criteria,
		relations: { uploader: true, artists: true, songs: true, translations: true },
	});
	return albums;
};

export const createAlbum = async (album: NewAlbumEntry) => {
	const newAlbum = await albumRepository.save(album);
	return newAlbum;
};

export const getAlbumFromSpotify = async (accessToken: string, id: string) => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}`, config);
	return albumAdapter.adaptAlbumFromSpotify(data);
};
