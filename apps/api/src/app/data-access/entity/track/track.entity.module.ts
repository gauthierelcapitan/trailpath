import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TrackEntity } from '@trailpath/api/app/data-access/entity/track/track.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TrackEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class TrackEntityModule {}
