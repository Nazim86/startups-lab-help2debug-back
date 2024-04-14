import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
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
  id: string;

  @Column({ type: 'varchar' })
  issueId: string;

  @Column({ type: 'varchar' })
  mentorId: string;

  @Column({ type: 'uuid' })
  code: string;

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

  // @ManyToMany(() => User, (u) => u.session) //TODO: is there need for this relation
  // user: User[];

  // @ManyToOne(() => Issue, (i) => i.session) //TODO: is there need for this relation
  // issue: Issue;
}
