import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@trailpath/api/app/common/pipe/zod-validation-pipe';
import { CoreModule } from '@trailpath/api/app/core/core.module';
import { HealthModule } from '@trailpath/api/app/health/health.module';
import { TrackModule } from '@trailpath/api/app/track/track/track.module';

@Module({
  imports: [CoreModule, HealthModule, TrackModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
