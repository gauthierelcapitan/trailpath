import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { Module } from '@nestjs/common';
import { TrackController } from '@trailpath/api/app/track/track.controller';
import { TrackService } from '@trailpath/api/app/track/track.service';

@Module({
  imports: [FastifyMulterModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
