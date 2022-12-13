import { Module } from '@nestjs/common';
import { TrackController } from '@trailpath/api/app/track/track.controller';
import { TrackService } from '@trailpath/api/app/track/track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
