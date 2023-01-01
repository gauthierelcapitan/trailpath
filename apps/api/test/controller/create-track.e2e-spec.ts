import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@trailpath/api/app/app.module';
import { CreateTrackDtoInterface } from '@trailpath/api-interface/track/create-track/create-track.dto.interface';
import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum } from '@trailpath/gpx-resample';
import * as request from 'supertest';

describe('E2E : Create Track', () => {
  let app: INestApplication;
  const gpxFile = __dirname + '/../fixtures/gpx/utmb-2022-coros-kj.gpx';

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

    const createTrackDto: CreateTrackDtoInterface = {
      distanceMethod: GpxDistanceMethodEnum.HAVERSINE,
      resampleMethod: GpxResampleMethodEnum.RAMER_DOUGLAS_PEUCKER,
    };

    const response = await agent
      .post(`/tracks`)
      .set('Content-Type', 'multipart/form-data')
      .field(createTrackDto)
      .attach('gpxFile', gpxFile);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  it(`should fail to create a track without gpx file`, async () => {
    const agent = request(app.getHttpServer());

    const createTrackDto: CreateTrackDtoInterface = {
      distanceMethod: GpxDistanceMethodEnum.HAVERSINE,
      resampleMethod: GpxResampleMethodEnum.RAMER_DOUGLAS_PEUCKER,
    };

    const response = await agent
      .post(`/tracks`)
      .set('Content-Type', 'multipart/form-data')
      .field(createTrackDto);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should fail to create a track with missing distance and resample method`, async () => {
    const agent = request(app.getHttpServer());

    const response = await agent
      .post(`/tracks`)
      .set('Content-Type', 'multipart/form-data')
      .field({})
      .attach('gpxFile', gpxFile);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(
      'Input validation failed: distanceMethod: Required, resampleMethod: Required',
    );
  });

  it(`should fail to create a track with a jpg instead of a gpx`, async () => {
    const agent = request(app.getHttpServer());

    const jpgFile = __dirname + '/../fixtures/image/utmb22-utmb-kj.jpg';

    const createTrackDto: CreateTrackDtoInterface = {
      distanceMethod: GpxDistanceMethodEnum.HAVERSINE,
      resampleMethod: GpxResampleMethodEnum.RAMER_DOUGLAS_PEUCKER,
    };

    const response = await agent
      .post(`/tracks`)
      .set('Content-Type', 'multipart/form-data')
      .field(createTrackDto)
      .attach('gpxFile', jpgFile);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Unsupported file type .jpg');
  });

  afterEach(async () => {
    await app.close();
  });
});
