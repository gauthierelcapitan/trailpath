import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElevationService } from '@trailpath/api/app/elevation/elevation.service';
import { ReplaceElevationEarthdataService } from '@trailpath/api/app/elevation/replace-elevation-earthdata/replace-elevation-earthdata.service';
import { ReplaceElevationGeonamesService } from '@trailpath/api/app/elevation/replace-elevation-geonames/replace-elevation-geonames.service';
import { ReplaceElevationIgnService } from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    ElevationService,
    ReplaceElevationIgnService,
    ReplaceElevationEarthdataService,
    ReplaceElevationGeonamesService,
  ],
  exports: [ElevationService],
})
export class ElevationModule {}
