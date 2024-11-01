import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.APP_PORT,
}));
