import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HelpType } from '../types/helpType.enum';
import { LiveStatus } from '../types/liveStatus.enum';
import { Account } from '../../user/entities/account.entity';

@Entity()
export class MentorSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  accountId: string;

  @Column({ type: 'varchar' })
  helpType: HelpType;

  @Column({ type: 'varchar', nullable: true })
  videoConferenceLink: string;

  @Column({ type: 'varchar', nullable: true })
  status: LiveStatus;

  @Column({ type: 'date', nullable: true })
  statusUpdate: Date;

  @OneToOne(() => Account, (a) => a.mentorSetting)
  account: Account;
}
