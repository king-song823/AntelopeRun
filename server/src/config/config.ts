export default {
  type: 'postgres', // 修改这里，明确指定数据库类型
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // 开发环境可以使用，生产环境使用迁移
  logging: true, // 可选，查看 SQL 日志，帮助调试
};
