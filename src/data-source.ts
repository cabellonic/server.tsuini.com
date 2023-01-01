import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
// Entities
import { User, Session, Song, Album, Artist, Language, Translation, Lyric } from './models';

dotenv.config();

export const AppDataSource = new DataSource({
	type: process.env.DB_TYPE as any,
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT! || 3306,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: true,
	logging: false,
	entities: [User, Song, Album, Artist, Session, Language, Translation, Lyric],
	migrations: [],
	subscribers: [],
});
