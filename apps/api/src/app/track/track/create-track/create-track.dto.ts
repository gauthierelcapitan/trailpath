import { ApiProperty } from '@nestjs/swagger';
import { UploadedFileInterface } from '@trailpath/api/app/common/interface/uploaded-file.interface';
import { CreateTrackDtoInterface } from '@trailpath/api-interface/track/create-track/create-track.dto.interface';
import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum } from '@trailpath/gpx-resample';

export class CreateTrackDto implements CreateTrackDtoInterface {
  @ApiProperty({
    name: 'distanceMethod',
    description:
      'The method used for calculating distance between two GPS coordinates.',
    type: GpxDistanceMethodEnum,
    enum: Object.values(GpxDistanceMethodEnum),
    example: GpxDistanceMethodEnum.HAVERSINE,
  })
  distanceMethod: GpxDistanceMethodEnum;

  @ApiProperty({
    name: 'resampleMethod',
    description: 'The method used for resampling GPS coordinates.',
    type: GpxResampleMethodEnum,
    enum: Object.values(GpxResampleMethodEnum),
    example: GpxResampleMethodEnum.RAMER_DOUGLAS_PEUCKER,
  })
  resampleMethod: GpxResampleMethodEnum;

  @ApiProperty({ type: 'string', format: 'binary' })
  gpxFile: UploadedFileInterface;

  constructor(partial?: Partial<CreateTrackDto>) {
    Object.assign(this, partial);
  }
}
