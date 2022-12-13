import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsFilter } from '@trailpath/api/app/common/filter/exceptions.filter';
import { LogInterceptor } from '@trailpath/api/app/common/interceptor/log.interceptor';
import { HealthModule } from '@trailpath/api/app/health/health.module';
import { TrackModule } from '@trailpath/api/app/track/track.module';

@Module({
  imports: [HealthModule, TrackModule],
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule {}
