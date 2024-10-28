import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);
  // 注册用户
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.userService.create(email, password);
  }

  // 登录用户
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ message: string }> {
    this.logger.log(`Attempting to log in user with email: ${email}`);
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { message: '登录成功' };
    }
    return { message: '登录失败' };
  }
}
