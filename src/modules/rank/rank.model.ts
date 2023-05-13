import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.model';

@Entity()
export class Rank {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
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

	@OneToMany(() => User, user => user.rank)
	users: Array<User>;

	@DeleteDateColumn()
	deleted_at?: Date;
}

export type NewRankEntry = Omit<Rank, 'created_at' | 'updated_at' | 'deleted_at'>;
