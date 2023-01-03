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
import { Artist } from '../artist/artist.model';
import { Translation } from '../translation/translation.model';
import { User } from '../user/user.model';

@Entity()
export class Song {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	name: string;

	@Column()
	spotifyUrl: string;

	@Column()
	duration: number;

	@Column()
	discNumber: number;

	@Column()
	trackNumber: number;

	@ManyToMany(() => Artist, artist => artist.songs, { nullable: false })
	artists: Array<Artist>;

	@ManyToOne(() => Album, { nullable: false })
	album: Album;

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
	deleted_at: Date;
}

export type NewSongEntry = Omit<Song, 'created_at' | 'updated_at' | 'deleted_at' | 'translations'>;
