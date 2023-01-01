import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Language, User } from '../../models';

@Entity()
export class Lyric {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	caption: string;

	@ManyToOne(() => Language, { nullable: false })
	@JoinColumn()
	language: Language;

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

export type NewLyricEntry = Omit<Lyric, 'created_at' | 'updated_at' | 'deleted_at'>;
