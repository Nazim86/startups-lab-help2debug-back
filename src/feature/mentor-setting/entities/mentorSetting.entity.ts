import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HelpType } from '../types/helpType.enum';
import { LiveStatus } from '../types/liveStatus.enum';
import { Account } from '../../user/entities/account.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class MentorSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  accountId: string; //TODO: Why there is need for accountId?

  @Column({ type: 'varchar' })
  helpType: HelpType;

  @Column({ type: 'varchar', nullable: true })
  videoConferenceLink: string;

  @Column({ type: 'varchar' })
  status: LiveStatus;

  @Column({ type: 'date', nullable: true })
  statusUpdate: Date;

  @OneToOne(() => Account, (a) => a.mentorSetting)
  account: Account; //TODO: Do I need to relate mentorSetting with account?

  @OneToOne(() => User, (u) => u.mentorSetting)
  user: User;
}
