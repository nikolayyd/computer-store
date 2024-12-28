import { knexSnakeCaseMappers } from 'objection';
import { config as envConfig } from './src/config';

export const config = {
  development: {
    client: 'postgres',
    connection: {
      host: envConfig.get('database.host'),
      port: envConfig.get('database.port'),
      user: envConfig.get('database.username'),
      password: envConfig.get('database.password'),
      database: envConfig.get('database.name'),
    },
    ...knexSnakeCaseMappers(),
  },
};
