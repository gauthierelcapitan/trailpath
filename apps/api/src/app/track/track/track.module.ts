import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { Module } from '@nestjs/common';
import { CreateTrackController } from '@trailpath/api/app/track/track/create-track/create-track.controller';
import { TrackService } from '@trailpath/api/app/track/track/track.service';

@Module({
  imports: [FastifyMulterModule],
  controllers: [CreateTrackController],
  providers: [TrackService],
})
export class TrackModule {}
