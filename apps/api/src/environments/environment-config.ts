import { EnvironmentInterface } from '@trailpath/api/environments/interface/environment.interface';
import merge from 'ts-deepmerge';

export function getEnvConfig(env) {
  const envVariables = parseEnvVariables();
  return merge(env, envVariables);
}

/** Environment variables take precedence */
function parseEnvVariables() {
  const envVariables: DeepPartial<EnvironmentInterface> = {};
  const env = process.env;
  if (env) {
    if (env.PRODUCTION) envVariables.production = env.PRODUCTION === 'true';
    if (env.PORT) envVariables.port = parseInt(env.PORT, 10);
    if (env.GLOBAL_API_PREFIX) envVariables.globalApiPrefix = env.GLOBAL_API_PREFIX;

    // Database
    envVariables.database = {};
    if (env.DATABASE_HOST) envVariables.database.host = env.DATABASE_HOST;
    if (env.DATABASE_PORT) envVariables.database.port = parseInt(env.DATABASE_PORT, 10);
    if (env.DATABASE_DATABASE) envVariables.database.database = env.DATABASE_DATABASE;
    if (env.DATABASE_USERNAME) envVariables.database.username = env.DATABASE_USERNAME;
    if (env.DATABASE_PASSWORD) envVariables.database.password = env.DATABASE_PASSWORD;

    // Earthdata
    envVariables.earthdata = {};
    if (env.EARTHDATA_USERNAME) envVariables.earthdata.username = env.EARTHDATA_USERNAME;
    if (env.EARTHDATA_PASSWORD) envVariables.earthdata.password = env.EARTHDATA_PASSWORD;
    if (env.EARTHDATA_TILES_DIRECTORY) envVariables.earthdata.password = env.EARTHDATA_TILES_DIRECTORY;

    // Geonames
    envVariables.geonames = {};
    if (env.GEONAMES_USERNAME) envVariables.geonames.username = env.GEONAMES_USERNAME;
  }
  return envVariables;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
