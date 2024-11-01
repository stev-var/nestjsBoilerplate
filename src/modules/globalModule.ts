import { ConfigModule } from '@nestjs/config';
import { configLoads } from 'src/config';

export const globalModules = [
  ConfigModule.forRoot({
    load: configLoads,
    isGlobal: true,
    envFilePath: ['.env'],
  }),
];
