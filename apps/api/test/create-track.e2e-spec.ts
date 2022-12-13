import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app/app.module';

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

    const response = await agent.get(
      `/api/track/f5054664-91a0-4579-a856-14efad346441`,
    );

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  afterEach(async () => {
    await app.close();
  });
});
