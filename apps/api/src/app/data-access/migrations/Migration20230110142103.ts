// noinspection JSUnusedGlobalSymbols,SqlNoDataSourceInspection,SqlDialectInspection

import { Migration } from '@mikro-orm/migrations';

export class Migration20230110142103 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "track" ("id" varchar(255) not null, "name" varchar(255) not null, "distance" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "track_pkey" primary key ("id"));',
    );
  }
}
