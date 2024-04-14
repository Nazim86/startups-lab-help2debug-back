import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HelpType } from '../../mentor-setting/types/helpType.enum';
import { Hashtag } from '../../hashtag/entities/hashtag.entity';
import { User } from '../../user/entities/user.entity';
import { Session } from '../../session/entities/session.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'varchar' })
  // accountId: string;

  @Column({ type: 'varchar' })
  type: HelpType;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => Hashtag, (h) => h.issue)
  @JoinTable()
  hashtag: Hashtag[];

  // @OneToMany(() => Session, (s) => s.issue) //TODO: is there need for this relation
  // @JoinColumn()
  // session: Session[];

  @ManyToOne(() => User, (u) => u.issue)
  user: User;
}
