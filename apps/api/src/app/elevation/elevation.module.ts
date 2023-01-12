import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  ReplaceElevationIgnService
} from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.service';
import {
  ElevationService
} from '@trailpath/api/app/elevation/elevation.service';

@Module({
  imports: [HttpModule],
  providers: [ElevationService, ReplaceElevationIgnService],
  exports: [ElevationService]
})
export class ElevationModule {}
