import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Album {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column()
	name: string;

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

export type NewAlbumEntry = Omit<Album, 'created_at' | 'updated_at'>;
