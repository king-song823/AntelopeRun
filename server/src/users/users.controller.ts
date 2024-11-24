// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login-or-register')
  @HttpCode(HttpStatus.OK) // 设置适当的 HTTP 状态码
  async loginOrRegister(
    @Body('phoneNumber') phoneNumber: string,
    @Body('code') code?: string,
  ) {
    return await this.usersService.sendOrVerifyCode(phoneNumber, code);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard) // JWT 验证 + 角色守卫
  @Roles('admin') // 仅管理员可以访问
  @Post('create-admin')
  createAdmin(@Body() body) {
    // 假设直接设置用户为管理员，后续实现实际逻辑
    return { message: 'Admin created successfully' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'admin') // 学生和管理员都可以访问
  @Get('profile')
  getProfile() {
    return { message: 'This is a protected route' };
  }
}
