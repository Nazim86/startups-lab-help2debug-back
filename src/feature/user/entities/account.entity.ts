import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './account.enum';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  provider: Provider;

  @Column({ type: 'varchar', nullable: true })
  providerUserId: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @OneToOne(() => User, (u) => u.account)
  @JoinColumn()
  user: User;
}
