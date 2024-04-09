import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Device } from '../../device/entities';
import { Hashtag } from '../../hashtag/entities/hashtag.entity';
import { Session } from '../../session/entities/session.entity';
import { Issue } from '../../issue/entities/issue.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  companyName: string;

  @OneToOne(() => Account, (a) => a.user)
  @JoinColumn()
  account: Account;

  @OneToMany(() => Device, (d) => d.user)
  @JoinColumn()
  device: Device;

  @ManyToMany(() => Hashtag, (h) => h.user)
  @JoinTable()
  hashtag: Hashtag[];

  @ManyToMany(() => Session, (s) => s.user)
  @JoinTable()
  session: Session[];

  @OneToMany(() => Issue, (i) => i.user)
  @JoinColumn()
  issue: Issue[];
}
