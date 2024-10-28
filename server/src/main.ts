import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // 设置日志级别
  });
  app.enableCors(); // 允许跨域请求
  // await app.listen(process.env.PORT ?? 4000);
  await app.listen(4000);
}
bootstrap();
