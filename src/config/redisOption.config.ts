import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('redis.REDIS_HOST') || 'localhost',
        port: parseInt(
          configService.get<string>('redis.REDIS_PORT') ?? '6379',
          10,
        ),
      },
      password: configService.get<string>('redis.REDIS_PASSWORD') ?? '',
    });
    return {
      store: () => store,
      //   ttl: configService.get<number>('redis.CACHE_TTL', 180), // TTL in seconds, default to 600 seconds (10 minutes)
    };
  },
  inject: [ConfigService],
};
