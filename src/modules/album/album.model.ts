import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Artist } from '../artist/artist.model';
import { Song } from '../song/song.model';
import { Translation } from '../translation/translation.model';
import { User } from '../user/user.model';

@Entity()
export class Album {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	name: string;

	@Column()
	completed: boolean;

	@Column()
	spotifyUrl: string;

	@Column()
	albumType: string;

	@Column()
	totalSongs: number;

	@Column()
	href: string;

	@Column()
	image: string;

	@Column()
	releaseDate: string;

	@ManyToMany(() => Artist, artist => artist.albums, { nullable: false })
	artists: Array<Artist>;

	@OneToMany(() => Song, song => song.album)
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

export type NewAlbumEntry = Omit<Album, 'created_at' | 'updated_at' | 'translations' | 'songs'>;
