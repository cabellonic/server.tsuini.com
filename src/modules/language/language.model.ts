import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Language {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ unique: true })
	code: string;

	@Column()
	name: string;

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

export type NewLanguageEntry = Omit<Language, 'created_at' | 'updated_at' | 'deleted_at'>;
