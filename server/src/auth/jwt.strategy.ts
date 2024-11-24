// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头提取 Token
      ignoreExpiration: false, // 默认 Token 过期则失效
      secretOrKey: process.env.JWT_SECRET, // JWT 签名密钥
    });
  }

  async validate(payload: any) {
    // 返回 Token 解码后的用户信息，附加到请求对象
    return {
      userId: payload.sub,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
    };
  }
}
