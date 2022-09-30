import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;
}

export type NewSongEntry = Omit<Song, "created_at" | "updated_at" | "deleted_at">;
