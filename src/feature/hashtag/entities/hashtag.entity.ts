import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Issue } from '../../issue/entities/issue.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ unique: true, type: 'varchar' })
  normalized: string;

  @ManyToMany(() => User, (u) => u.hashtag)
  user: User[];

  @ManyToMany(() => Issue, (i) => i.hashtag)
  issue: Issue[];
}
