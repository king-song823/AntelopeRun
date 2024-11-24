import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './auth/roles.guard';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，确保在任何模块中都可以注入 ConfigService
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ink', // 替换为你的 PostgreSQL 用户名
      password: 'songbing521', // 替换为你的 PostgreSQL 密码
      database: 'ink', // 数据库名称
      autoLoadEntities: true, // 自动加载实体
      synchronize: true, // 开发阶段可设为 true，生产环境建议设为 false
      logging: true, // 启用日志
    }),
    UsersModule,
    // 认证模块
  ],
  providers: [JwtStrategy, RolesGuard], // 确保 JwtStrategy 已注册
})
export class AppModule {}
