import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_API_PATH,
  SWAGGER_TAG_HEALTH,
  SWAGGER_TAG_TRACK,
} from '@trailpath/api/app/common/constant/swagger.constant';
import { patchNestjsSwagger } from '@trailpath/api/app/common/openapi/patch-nest-swagger';
import { EnvironmentInterface } from '@trailpath/api/environments/interface/environment.interface';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const fastifyOptions: ConstructorParameters<typeof FastifyAdapter>[0] = {
    logger: false,
  };

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(fastifyOptions));

  app.enableShutdownHooks();
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  const globalApiPrefix = configService.get<EnvironmentInterface['globalApiPrefix']>('globalApiPrefix') ?? 'api';

  app.setGlobalPrefix(globalApiPrefix);
  setupOpenApi(app);

  const port = configService.get<EnvironmentInterface['port']>('port') ?? 3333;
  await app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      Logger.error(err);
    }
    const baseUrl = configService.get<EnvironmentInterface['baseUrl']>('baseUrl') ?? 'http://localhost';
    Logger.log(`🚀 Application is running on: ${baseUrl}:${port}/${globalApiPrefix}`);
  });
}

bootstrap().then();

function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Trail Path API')
    .setDescription('The Trail Path API is an API to handle trail paths.')
    .setVersion('1.0')
    .addTag(SWAGGER_TAG_HEALTH)
    .addTag(SWAGGER_TAG_TRACK)
    .build();

  /**
   * TODO Temporary hacky patch to handle Zod dto in Swagger.
   */
  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_PATH, app, document, {
    useGlobalPrefix: true,
  });
}
