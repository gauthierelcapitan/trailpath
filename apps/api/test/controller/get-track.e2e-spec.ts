import { afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@trailpath/api/app/app.module';
import * as request from 'supertest';

describe('E2E : Get Track', () => {
  let app: INestApplication;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    orm = moduleFixture.get<MikroORM>(MikroORM);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`should get a track by its uuid`, async () => {
    const agent = request(app.getHttpServer());

    const uuid = 'f5054664-91a0-4579-a856-14efad346441';

    const response = await agent.get(`/tracks/${uuid}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.uuid).toBe(uuid);
  });

  afterEach(async () => {
    orm.em.clear();
  });

  afterEach(async () => {
    await orm.close();
    await app.close();
  });
});
