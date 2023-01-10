import { mikroOrmConfigBase } from './mikro-orm.config.base';
import { env } from './src/environments/environment';
import { getEnvConfig } from './src/environments/environment-config';

const db = getEnvConfig(env).database;

const config = {
  ...mikroOrmConfigBase(__dirname),
  host: db.host,
  port: db.port,
  dbName: db.database,
  user: db.username,
  password: db.password,
};
export default Promise.resolve(config);
