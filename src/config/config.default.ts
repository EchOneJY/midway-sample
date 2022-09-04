import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1661839442121_6612',
  koa: {
    port: 8001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mariadb',
        host: '192.168.166.41',
        port: 3306,
        username: 'test',
        password: 'zjxl2022#',
        database: 'test',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: true,

        // 配置实体模型
        entities: [User],
      },
    },
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0,
    },
  },
} as MidwayConfig;
