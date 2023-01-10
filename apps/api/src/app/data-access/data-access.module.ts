import { Global, Module } from '@nestjs/common';
import { EntityModule } from '@trailpath/api/app/data-access/entity/entity.module';

@Global()
@Module({
  imports: [EntityModule],
  controllers: [],
  providers: [],
  exports: [EntityModule],
})
export class DataAccessModule {}
