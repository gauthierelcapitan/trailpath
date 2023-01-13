import { Injectable } from '@nestjs/common';
import { UploadedFileInterface } from '@trailpath/api/app/common/interface/uploaded-file.interface';
import { TrackRepository } from '@trailpath/api/app/data-access/entity/track/track.entity.repository';
import { ElevationService } from '@trailpath/api/app/elevation/elevation.service';
import { ElevationDatasourceEnum } from '@trailpath/api-interface/elevation/elevation-datasource.enum';
import { ElevationMethodEnum } from '@trailpath/api-interface/elevation/elevation-method.enum';
import { GpxDistanceMethodEnum, length } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum, resample } from '@trailpath/gpx-resample';
import { gpxToTrack } from '@trailpath/gpx-track';

@Injectable()
export class CreateTrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly elevationService: ElevationService,
  ) {}

  async create(
    file: UploadedFileInterface,
    distanceMethod: GpxDistanceMethodEnum,
    resampleMethod: GpxResampleMethodEnum,
    elevationMethod: ElevationMethodEnum,
    elevationDatasource: ElevationDatasourceEnum,
  ): Promise<string> {
    const gpxString = file.buffer.toString('utf-8');
    const filename = file.fieldname;

    const track = gpxToTrack(gpxString, filename);

    const trackResampled = resample(
      track.track,
      resampleMethod,
      distanceMethod,
    );

    trackResampled.geometry.coordinates = await this.elevationService.replace(
      trackResampled.geometry.coordinates,
      elevationMethod,
      elevationDatasource,
    );

    const distance = length(trackResampled, distanceMethod);

    const trackEntity = this.trackRepository.create({
      name: filename,
      distance,
    });
    await this.trackRepository.persistAndFlush(trackEntity);

    return trackEntity.id;
  }
}
