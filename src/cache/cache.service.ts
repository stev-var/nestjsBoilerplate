import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { GetCacheDto, SetCacheDto } from './dtos/cache.dtos';
import { infoLoggger } from 'src/utility/logger';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async deleteUserCache(cacheQuery: GetCacheDto) {
    const keyValue = `${cacheQuery.type}_${cacheQuery.user.toString()}`;
    return await this.cacheManager.del(keyValue);
  }

  async getCacheUser(cacheQuery: GetCacheDto): Promise<any> {
    const keyValue = `${cacheQuery.type}_${cacheQuery.user.toString()}`;
    return await this.cacheManager.get(keyValue);
  }

  async setCacheUser(cacheQuery: SetCacheDto, ttl: number = 180) {
    const keyValue = `${cacheQuery.type}_${cacheQuery.user.toString()}`;
    return await this.cacheManager.set(keyValue, cacheQuery.data, {
      ttl,
    } as any);
  }

  async resetCache(): Promise<void> {
    infoLoggger('Cache reseted');
    return await this.cacheManager.reset();
  }
}
