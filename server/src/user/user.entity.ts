import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // 表名为 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number; // 自增主键

  @Column({ unique: true }) // 确保电子邮件唯一
  email: string; // 用户电子邮件

  @Column()
  password: string; // 用户密码（哈希后保存）
}
