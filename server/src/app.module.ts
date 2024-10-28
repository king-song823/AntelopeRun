import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity'; // 导入你的实体

@Module({
  imports: [
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
    UserModule, // 确保 UserModule 被导入
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
