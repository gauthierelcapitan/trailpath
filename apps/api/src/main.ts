import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GLOBAL_PREFIX } from '@trailpath/api/app/common/constant/global.constant';
import {
  SWAGGER_API_PATH,
  SWAGGER_TAG_HEALTH,
  SWAGGER_TAG_TRACK,
} from '@trailpath/api/app/common/constant/swagger.constant';
import { patchNestjsSwagger } from '@trailpath/api/app/common/openapi/patch-nest-swagger';
import { ZodValidationPipe } from '@trailpath/api/app/common/pipe/zod-validation-pipe';

import { AppModule } from './app/app.module';

async function bootstrap() {
  // noinspection ES6RedundantAwait,TypeScriptValidateJSTypes
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Trail Path API')
    .setDescription('The Trail Path API is an API to handle trail paths.')
    .setVersion('1.0')
    .addTag(SWAGGER_TAG_HEALTH)
    .addTag(SWAGGER_TAG_TRACK)
    .build();

  // TODO Temporary hacky patch to handle Zod dto in Swagger.
  patchNestjsSwagger();

  app.useGlobalPipes(new ZodValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_PATH, app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`,
  );
}

bootstrap().then();
