import { Module } from '@nestjs/common';
import { TrackService } from '@trailpath/api/app/track/track.service';
import { TrackController } from '@trailpath/api/app/track/track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
