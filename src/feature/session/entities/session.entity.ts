import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { SessionStatus } from '../types/sessionStatus.enum';
import { StatusByParticipant } from '../types/statusByParticipant.enum';
import { Issue } from '../../issue/entities/issue.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  issueId: string;

  @Column({ type: 'varchar' })
  status: SessionStatus;

  @Column({ type: 'date' })
  statusUpdateAt: Date;

  @Column({ type: 'varchar' })
  statusByMentor: StatusByParticipant;

  @Column({ type: 'varchar' })
  mentorFeedbackForAdmins: string;

  @Column({ type: 'varchar' })
  studentFeedbackForAdmins: string;

  @Column({ type: 'varchar' })
  statusByMentee: StatusByParticipant;

  @Column({ type: 'uuid' })
  code: string;

  @ManyToMany(() => User, (u) => u.session)
  @JoinTable()
  user: User[];

  @OneToOne(() => Issue, (i) => i.session)
  issue: Issue;
}
