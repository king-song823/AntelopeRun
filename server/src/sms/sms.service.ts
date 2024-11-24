import { Injectable } from '@nestjs/common';
import * as Core from '@alicloud/pop-core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private client: Core;

  constructor(private configService: ConfigService) {
    this.client = new Core({
      accessKeyId: this.configService.get<string>('ALIYUN_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get<string>(
        'ALIYUN_ACCESS_KEY_SECRET',
      ),
      apiVersion: '2017-05-25',
      endpoint: 'https://dysmsapi.aliyuncs.com',
    });
  }

  async sendVerificationCode(phone: string, code: string): Promise<void> {
    const params = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: phone,
      SignName: this.configService.get<string>('ALIYUN_SIGN_NAME'),
      TemplateCode: this.configService.get<string>('ALIYUN_TEMPLATE_CODE'),
      TemplateParam: JSON.stringify({ code }),
    };

    const requestOption = {
      method: 'POST',
    };

    try {
      const result = (await this.client.request(
        'SendSms',
        params,
        requestOption,
      )) as any;
      if (result.Code !== 'OK') {
        throw new Error(`发送短信失败: ${result.Message}`);
      }
      console.log('短信发送成功:', result);
    } catch (error) {
      console.error('发送短信失败:', error);
      throw error;
    }
  }
}
