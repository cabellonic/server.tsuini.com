import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MenuItem {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	label!: string;

	@Column()
	path!: string;

	@Column({ unique: true })
	order!: number;

	@Column({ default: null })
	icon?: string;
}
