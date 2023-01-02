import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@trailpath/api/app/common/pipe/zod-validation-pipe';
import { CoreModule } from '@trailpath/api/app/core/core.module';
import { HealthModule } from '@trailpath/api/app/health/health.module';
import { TrackModule } from '@trailpath/api/app/track/track/track.module';
import { getEnvConfig } from '@trailpath/api/environments/environment-config';
import { envValidation } from '@trailpath/api/environments/environment-validator';

import { env } from '../environments/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => getEnvConfig(env)],
      isGlobal: true,
      cache: true,
      validate: () => envValidation(env),
    }),
    CoreModule,
    HealthModule,
    TrackModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
