import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Device } from '../../device/entities';
import { Hashtag } from '../../hashtag/entities/hashtag.entity';
import { Session } from '../../session/entities/session.entity';
import { Issue } from '../../issue/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
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
  account: Account;

  @OneToMany(() => Device, (d) => d.user)
  device: Device;

  @ManyToMany(() => Hashtag, (h) => h.user)
  hashtag: Hashtag[];

  @ManyToMany(() => Session, (s) => s.user)
  session: Session[];

  @OneToMany(() => Issue, (i) => i.user)
  issue: Issue[];
}
