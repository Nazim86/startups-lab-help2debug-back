import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'date' })
  lastActiveDate: Date;

  @Column({ type: 'date' })
  expirationDate: Date;

  @ManyToOne(() => User, (u) => u.device, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
