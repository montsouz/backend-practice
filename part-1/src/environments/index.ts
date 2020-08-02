import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// Auth
const SECRET: string = process.env.SECRET || 'someultramegasupersecuresecret';

// application
const DOMAIN: string = process.env.DOMAIN || '0.0.0.0';
const PORT: number =
  +process.env.PORT || process.env.NODE_ENV === 'docker' ? 5001 : 5000;
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;

// database
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST =
  process.env.DB_HOST || process.env.NODE_ENV === 'docker'
    ? 'mongo'
    : '0.0.0.0';
const DB_PORT = +process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'branded-db';
const MONGO_URL =
  process.env.MONGO_URL || process.env.DB_USER
    ? `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
    : `mongodb://${DB_HOST}:${DB_PORT}`;
const DB_URL = process.env.DB_URL || `${MONGO_URL}/${DB_NAME}`;


export default () => ({
  NODE_ENV,
  SECRET,
  DOMAIN,
  PORT,
  RATE_LIMIT_MAX,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_URL,
  MONGO_URL,
});

export {
  NODE_ENV,
  SECRET,
  DOMAIN,
  PORT,
  RATE_LIMIT_MAX,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_URL,
  MONGO_URL,
};
