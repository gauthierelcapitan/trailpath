import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentDatabaseInterface } from '@trailpath/api/environments/interface/environment-database.interface';

import { mikroOrmConfigBase } from '../../../mikro-orm.config.base';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  // noinspection JSUnusedGlobalSymbols
  public createMikroOrmOptions(): MikroOrmModuleOptions<PostgreSqlDriver> {
    const db = this.configService.get<EnvironmentDatabaseInterface>('database');

    return {
      host: db.host,
      port: db.port,
      dbName: db.database,
      user: db.username,
      password: db.password,
      autoLoadEntities: true,
      ...mikroOrmConfigBase(__dirname),
    };
  }
}
