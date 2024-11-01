import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { globalModules } from './modules/globalModule';
import { redisModules } from './modules/cacheModule';
import { dbModules } from './modules/dbModule';
import { CacheModules } from './cache/cache.module';
import { GatewayModule } from './sockets/gateway.module';

@Module({
  imports: [
    ...globalModules,
    ...redisModules,
    ...dbModules,
    CacheModules,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
