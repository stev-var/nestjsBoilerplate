import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { errorLoggger, infoLoggger } from 'src/utility/logger';
export const dbModules = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('database.URL'),
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          infoLoggger('Successfully connected to the database');
        });
        connection.on('error', (err) => {
          errorLoggger('Database connection error: ' + err.message);
        });
        return connection;
      },
      connectTimeoutMS: 5000,
      writeConcern: {
        w: 1,
        wtimeout: 5000,
      },
    }),
  }),
];
