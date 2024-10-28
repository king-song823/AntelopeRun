import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // 设置邮箱为登录名
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(); // 抛出未授权异常
    }
    return user; // 返回用户信息
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // 可以在这里添加其他自定义逻辑（如果需要）
}
