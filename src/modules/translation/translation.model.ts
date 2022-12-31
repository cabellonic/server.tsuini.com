import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { Language } from '../../models';

@Entity()
export class Translation {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	description: string;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	created_at: Date;

	@OneToOne(() => Language)
	@JoinColumn()
	language: Language;

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
