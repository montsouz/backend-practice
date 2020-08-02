import * as dotenv from 'dotenv';
import { RedisModuleOptions } from 'nestjs-redis';
import { ClientOpts } from 'redis';
dotenv.config();

const getDefaultHost = (): string =>
  process.env.NODE_ENV === 'docker' ? 'redis' : 'localhost';
// tslint:disable-next-line
export const RedisConfig: RedisModuleOptions = {
  host: process.env.REDIS_HOST || getDefaultHost(),
  port: parseInt(process.env.REDIS_PORT) || 6379,
  db: parseInt(process.env.REDIS_DB) || 4,
  password: process.env.REDIS_PASSWORD || '',
  keyPrefix: 'list',
  name: 'session',
  connectTimeout: 30000,
  reconnectOnError: (error: Error) => 1,
};

export const RedisConfigTest: RedisModuleOptions = {
  host: 'redis',
  port: 6379,
  db: 4,
  password: '',
  keyPrefix: 'list',
  name: 'session',
  connectTimeout: 30000,
  reconnectOnError: (error: Error) => 1,
};

export const RedisClientOpts: ClientOpts = {
  host: 'redis',
  port: 6379,
  db: 4,
  password: '',
  prefix: 'list',
};
