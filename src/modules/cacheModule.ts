import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'src/config/redisOption.config';
export const redisModules = [CacheModule.registerAsync(RedisOptions)];
