import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true })
	spotifyId!: string;

	@Column({ unique: true })
	username!: string;

	@Column({ unique: true })
	email!: string;

	@Column({ default: 2 })
	rank!: number;

	@Column()
	displayName!: string;

	@Column()
	avatar!: string;

	@Column()
	profileUrl!: string;

	@Column()
	spotifyPlan!: string;

	@Column()
	country?: string;
}
