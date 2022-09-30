import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	spotifyId: string;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ default: 2 })
	rank: number;

	@Column()
	displayName: string;

	@Column()
	avatar: string;

	@Column()
	profileUrl: string;

	@Column()
	spotifyPlan: string;

	@Column()
	country?: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at?: Date;
}

export type NewUserEntry = Omit<User, "id" | "created_at" | "updated_at">;
