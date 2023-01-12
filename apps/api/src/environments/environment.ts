import { EnvironmentInterface } from '@trailpath/api/environments/interface/environment.interface';

export const env: Partial<EnvironmentInterface> = {
  production: false,
  globalApiPrefix: 'api',
  port: 3333,
  baseUrl: 'http://localhost',
  database: {
    host: 'trail-path-db',
    port: 5432,
    database: 'trailpath',
    username: 'postgres',
    password: 'postgres',
  },
  earthdata: {
    username: 'gauthierelcapitan',
    password: 'Test12345',
    tilesDirectory: '/tmp',
  }
};
