import axios from "axios";
import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../../data-source";
// Models
import { Song, NewSongEntry } from "../../models";
// Adapter
import * as songAdapter from "./song.adapter";
// Utils
import * as utils from "../../utils";

const songRepository = AppDataSource.getRepository(Song);

export const getSongs = async () => {
	const songs = await songRepository.find();
	return songs;
};

export const getSongByID = async (id: string) => {
	const song = await songRepository.findOne({ where: { id } });
	return song;
};

export const getSongsByCriteria = async (criteria: FindOptionsWhere<Song> | FindOptionsWhere<Song>[]) => {
	const songs = await songRepository.find({ where: criteria });
	return songs;
};

export const createSong = async (song: NewSongEntry) => {
	const newSong = await songRepository.save(song);
	return newSong;
};

export const getSongFromSpotify = async (accessToken: string, id: string) => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, config);
	return songAdapter.adaptSongFromSpotify(data);
};
