import { Global, Module } from '@nestjs/common';
import { TrackEntityModule } from '@trailpath/api/app/data-access/entity/track/track.entity.module';

const modules = [TrackEntityModule];

@Global()
@Module({
  imports: [...modules],
  controllers: [],
  providers: [],
  exports: [...modules],
})
export class EntityModule {}
