import axios from 'axios';
import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../data-source';
// Models
import { Artist, NewArtistEntry } from '../../models';
// Adapter
import * as artistAdapter from './artist.adapter';
// Utils
import * as utils from '../../utils';

const artistRepository = AppDataSource.getRepository(Artist);

export const getArtists = async () => {
	const artists = await artistRepository.find();
	return artists;
};

export const getArtistByID = async (id: string) => {
	const artist = await artistRepository.findOne({
		where: { id },
		relations: { albums: true, translations: true, uploader: true },
	});
	return artist;
};

export const getArtistsByCriteria = async (criteria: FindOptionsWhere<Artist> | Array<FindOptionsWhere<Artist>>) => {
	const artists = await artistRepository.find({
		where: criteria,
		relations: { albums: true, translations: true, uploader: true },
	});
	return artists;
};

export const getArtistFromSpotify = async (accessToken: string, id: string) => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, config);
	return artistAdapter.adaptArtistFromSpotify(data);
};

export const createArtist = async (artist: NewArtistEntry) => {
	const newArtist = await artistRepository.save(artist);
	return newArtist;
};
