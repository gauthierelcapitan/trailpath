import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@trailpath/api/app/common/pipe/zod-validation-pipe';
import { CoreModule } from '@trailpath/api/app/core/core.module';
import { DataAccessModule } from '@trailpath/api/app/data-access/data-access.module';
import { MikroOrmConfigService } from '@trailpath/api/app/data-access/mikro-orm-config.service';
import { HealthModule } from '@trailpath/api/app/health/health.module';
import { TrackModule } from '@trailpath/api/app/track/track/track.module';
import { getEnvConfig } from '@trailpath/api/environments/environment-config';
import { envValidation } from '@trailpath/api/environments/environment-validator';

import { env } from '../environments/environment';
import { ElevationModule } from '@trailpath/api/app/elevation/elevation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => getEnvConfig(env)],
      isGlobal: true,
      cache: true,
      validate: () => envValidation(env),
    }),
    MikroOrmModule.forRootAsync({ useClass: MikroOrmConfigService }),
    CoreModule,
    DataAccessModule,
    ElevationModule,
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
