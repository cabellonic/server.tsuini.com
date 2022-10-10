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

export const getAlbums = async (): Promise<Array<Album>> => {
	const albums = await albumRepository.find();
	return albums;
};

export const getAlbumByID = async (id: string): Promise<Album | null> => {
	const album = await albumRepository.findOne({ where: { id } });
	return album;
};

export const getAlbumsByCriteria = async (
	criteria: FindOptionsWhere<Album> | FindOptionsWhere<Album>[],
): Promise<Array<Album>> => {
	const albums = await albumRepository.find({ where: criteria });
	return albums;
};

export const createAlbum = async (album: NewAlbumEntry): Promise<Album | null> => {
	const newAlbum = await albumRepository.save(album);
	return newAlbum;
};

export const getAlbumFromSpotify = async (accessToken: string, id: string): Promise<NewAlbumEntry | null> => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}`, config);
	return albumAdapter.adaptAlbumFromSpotify(data);
};
