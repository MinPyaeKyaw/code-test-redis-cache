import { createClient } from 'redis';
import { AppError } from '../utils/http';

class RedisService {
  private client;
  private static instance: RedisService;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) => console.error('Redis Client Error:', err));
    this.client.on('connect', () => console.log('Redis Client Connected'));
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.disconnect();
    }
  }

  async set(key: string, value: any, expiryInSeconds?: number) {
    try {
      const stringValue = JSON.stringify(value);
      if (expiryInSeconds) {
        await this.client.set(key, stringValue, { EX: expiryInSeconds });
      } else {
        await this.client.set(key, stringValue);
      }
    } catch (error) {
      throw new AppError('Failed to set cache', 500);
    }
  }

  async get(key: string) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      throw new AppError('Failed to get cache', 500);
    }
  }

  async del(key: string) {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new AppError('Failed to delete cache', 500);
    }
  }

  async flush() {
    try {
      await this.client.flushAll();
    } catch (error) {
      throw new AppError('Failed to flush cache', 500);
    }
  }
}

export const redisService = RedisService.getInstance();
