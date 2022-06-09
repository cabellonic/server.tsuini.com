import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";

@Entity()
export class Slide {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Column()
	description!: string;

	@Column()
	image!: string;

	@Column()
	link!: string;

	@Column({ default: false })
	imageOnly!: boolean;

	@Column()
	button?: string;

	@Column()
	imageMobile?: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	created_at!: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	updated_at!: Date;

	@DeleteDateColumn({ type: "timestamp" })
	deleted_at?: Date;
}
