import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

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

export type NewArtistEntry = Omit<Artist, 'created_at' | 'updated_at' | 'deleted_at'>;
