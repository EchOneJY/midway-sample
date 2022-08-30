// entity/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  uid: string;

  @Column({ length: 45, nullable: false, unique: true })
  username: string;

  @Column({ length: 45 })
  password: string;

  @Column({ name: 'head_img' })
  headImg: string;

  @Column()
  phone: number;

  @Column()
  remark: string;

  @Column()
  email: string;

  @Column({ name: 'last_login_time' })
  lastLoginTime: Date;

  @Column({ name: 'last_login_ip', length: 45 })
  lastLoginIp: string;
}
