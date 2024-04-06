import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from '../../issue/entities';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ unique: true, type: 'varchar' })
  normalized: string;

  @ManyToMany(() => User, (u) => u.hashtag)
  @JoinTable()
  user: User[];

  @ManyToMany(() => Issue, (i) => i.hashtag)
  @JoinTable()
  issue: Issue[];
}
