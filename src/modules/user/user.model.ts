import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
} from 'typeorm';
import { Translation } from '../translation/translation.model';
import { Rank } from '../rank/rank.model';

@Entity()
export class User {
	@PrimaryColumn({ unique: true })
	id: string;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

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

	@ManyToMany(() => Translation, translation => translation.translators)
	@JoinTable()
	translations: Array<Translation>;

	@ManyToOne(() => Rank, rank => rank.users)
	@JoinTable()
	rank: Rank;

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

export type NewUserEntry = Omit<User, 'created_at' | 'updated_at' | 'deleted_at' | 'translations'>;
