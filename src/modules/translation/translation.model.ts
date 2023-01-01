import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Language, User } from '../../models';

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

	@ManyToMany(() => User, user => user.translations, { nullable: false })
	translators: Array<User>;

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
