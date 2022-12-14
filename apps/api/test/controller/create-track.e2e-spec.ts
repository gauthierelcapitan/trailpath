import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@trailpath/api/app/app.module';
import * as request from 'supertest';

describe('E2E : Create Track', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`should create a track`, async () => {
    const agent = request(app.getHttpServer());

    const gpxFile = __dirname + '/../fixtures/gpx/utmb-2022-coros-kj.gpx';

    const response = await agent
      .post(`/tracks`)
      .set('Content-Type', 'multipart/form-data')
      .attach('gpxFile', gpxFile);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  afterEach(async () => {
    await app.close();
  });
});
