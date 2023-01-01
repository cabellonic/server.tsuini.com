import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Album } from '../album/album.model';
import { Song } from '../song/song.model';
import { Translation } from '../translation/translation.model';
import { User } from '../user/user.model';

@Entity()
export class Artist {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	name: string;

	@Column()
	avatar?: string;

	@Column()
	spotifyUrl: string;

	@ManyToMany(() => Album, album => album.artists)
	@JoinTable()
	albums: Array<Album>;

	@ManyToMany(() => Song, song => song.artists)
	@JoinTable()
	songs: Array<Song>;

	@ManyToMany(() => Translation)
	@JoinTable()
	translations: Array<Translation>;

	@ManyToOne(() => User, { nullable: false })
	@JoinColumn()
	uploader: User;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at?: Date;
}

export type NewArtistEntry = Omit<
	Artist,
	'created_at' | 'updated_at' | 'deleted_at' | 'albums' | 'songs' | 'translations' | 'uploader'
>;
