// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt'; // 引入 JwtService
import * as RPCClient from '@alicloud/pop-core';

@Injectable()
export class UsersService {
  private rpcClient: RPCClient;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // 注入 JwtService
  ) {
    this.rpcClient = new RPCClient({
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
  }

  async sendOrVerifyCode(
    phoneNumber: string,
    code?: string,
  ): Promise<{ isNewUser: boolean; token?: string }> {
    let user = await this.userRepository.findOne({ where: { phoneNumber } });

    if (!user) {
      user = this.userRepository.create({ phoneNumber });
      await this.userRepository.save(user);
      await this.sendVerificationCode(phoneNumber);
      return { isNewUser: true };
    }
    console.log(user, 'JWT Secret:', process.env.JWT_SECRET);

    if (code) {
      if (user.verificationCode === code) {
        // user.verificationCode = null;
        await this.userRepository.save(user);
        const payload = {
          username: user.phoneNumber,
          sub: user.id,
          role: user.role,
        };
        console.log('payload', payload);
        const token = this.jwtService.sign(payload);
        return { isNewUser: false, token };
      }
      throw new Error('验证码已失效');
    }

    await this.sendVerificationCode(phoneNumber);
    return { isNewUser: false };
  }

  private async sendVerificationCode(phoneNumber: string): Promise<void> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    user.verificationCode = verificationCode;
    await this.userRepository.save(user);

    const params = {
      PhoneNumbers: phoneNumber,
      SignName: process.env.ALIYUN_PHONE_SIGN_NAME,
      TemplateCode: process.env.ALIYUN_PHONE_TEMPLATE_CODE,
      TemplateParam: JSON.stringify({ code: verificationCode }),
    };

    await this.rpcClient.request('SendSms', params, { method: 'POST' });
  }
}
