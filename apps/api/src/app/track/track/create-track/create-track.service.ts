import { Injectable } from '@nestjs/common';
import { UploadedFileInterface } from '@trailpath/api/app/common/interface/uploaded-file.interface';
import { TrackRepository } from '@trailpath/api/app/data-access/entity/track/track.entity.repository';
import { GpxDistanceMethodEnum, length } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum, resample } from '@trailpath/gpx-resample';
import { gpxToTrack } from '@trailpath/gpx-track';

@Injectable()
export class CreateTrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(
    file: UploadedFileInterface,
    distanceMethod: GpxDistanceMethodEnum,
    resampleMethod: GpxResampleMethodEnum,
  ): Promise<string> {
    const gpxString = file.buffer.toString('utf-8');
    const filename = file.fieldname;

    const track = gpxToTrack(gpxString, filename);

    const trackResampled = resample(
      track.track,
      resampleMethod,
      distanceMethod,
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
