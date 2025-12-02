import Redis from 'ioredis';

// Switches between 'localhost' (dev) and 'redis-db' (Docker) automatically
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

export const redis = new Redis({
  host: REDIS_HOST,
  port: 6379,
});