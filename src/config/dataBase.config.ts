import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  URL: process.env.MONGODB_URI,
}));
