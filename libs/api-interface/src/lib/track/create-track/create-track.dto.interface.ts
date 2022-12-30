import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum } from '@trailpath/gpx-resample';

export interface CreateTrackDtoInterface {
  distanceMethod: GpxDistanceMethodEnum;
  gpxFile?: unknown;
  resampleMethod: GpxResampleMethodEnum;
}
