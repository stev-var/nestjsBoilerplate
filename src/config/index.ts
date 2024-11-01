import appConfig from './app.config';
import databaseConfig from './dataBase.config';
import redisConfig from './redis.config';

export const configLoads = [databaseConfig, appConfig, redisConfig];
