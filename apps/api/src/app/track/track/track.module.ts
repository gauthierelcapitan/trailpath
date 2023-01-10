import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { Module } from '@nestjs/common';
import { CreateTrackController } from '@trailpath/api/app/track/track/create-track/create-track.controller';
import { CreateTrackService } from '@trailpath/api/app/track/track/create-track/create-track.service';
import { GetTrackController } from '@trailpath/api/app/track/track/get-track/get-track.controller';
import { TrackService } from '@trailpath/api/app/track/track/track.service';

@Module({
  imports: [FastifyMulterModule],
  controllers: [GetTrackController, CreateTrackController],
  providers: [TrackService, CreateTrackService],
})
export class TrackModule {}
