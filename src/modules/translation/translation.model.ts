import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { Language } from '../../models';

@Entity()
export class Translation {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@ManyToOne(() => Language, { nullable: false })
	@JoinColumn()
	language: Language;

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

export type NewTranslationEntry = Omit<Translation, 'created_at' | 'updated_at' | 'deleted_at'>;
