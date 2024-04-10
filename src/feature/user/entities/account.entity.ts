import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './account.enum';
import { User } from './user.entity';
import { MentorSetting } from '../../mentor-setting/entities/mentorSetting.entity';

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
  user: User;

  @OneToOne(() => MentorSetting, (m) => m.account)
  @JoinColumn()
  mentorSetting: MentorSetting;
}
