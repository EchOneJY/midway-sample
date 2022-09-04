// entity/user.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user11')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', length: 45, nullable: false, unique: true })
  username: string;

  @Column({ length: 45 })
  password: string;

  @Column({ length: 45 })
  remark: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'last_login_time' })
  lastLoginTime: Date;
}
