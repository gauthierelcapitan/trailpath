import { Module } from '@nestjs/common';
import { CoreModule } from '@trailpath/api/app/core/core.module';
import { HealthModule } from '@trailpath/api/app/health/health.module';
import { TrackModule } from '@trailpath/api/app/track/track.module';

@Module({
  imports: [CoreModule, HealthModule, TrackModule],
})
export class AppModule {}
