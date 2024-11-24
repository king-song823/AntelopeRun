import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  verificationCode: string; // 存储验证码

  @Column({ default: 'admin' }) // 默认为学生
  role: string; // 'student' 或 'admin'

  @Column({ default: false })
  isPhoneNumberVerified: boolean; // 是否验证了手机号
}
228.28 + 201.13 + 171.46;
