import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  ReplaceElevationIgnService
} from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.service';
import {
  ElevationService
} from '@trailpath/api/app/elevation/elevation.service';
import {
  ReplaceElevationEarthdataService
} from '@trailpath/api/app/elevation/replace-elevation-earthdata/replace-elevation-earthdata.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ElevationService, ReplaceElevationIgnService, ReplaceElevationEarthdataService],
  exports: [ElevationService]
})
export class ElevationModule {}
