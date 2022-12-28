import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum } from '@trailpath/gpx-resample';
import { colFeretGeoJson } from '@trailpath/gpx-shared';

import { resample } from './gpx-resample';

describe('LIB :: GpxResample', () => {
  it('should simplify linestring using Ramer Douglas Peucker algorithm', () => {
    const resampledRDP = resample(
      colFeretGeoJson,
      GpxResampleMethodEnum.RAMER_DOUGLAS_PEUCKER,
      GpxDistanceMethodEnum.HAVERSINE,
    );

    expect(resampledRDP.geometry.coordinates.length).toEqual(572);
  });

  it('should simplify linestring using Visvalingam Whyatt algorithm', () => {
    const resampledVWMB = resample(
      colFeretGeoJson,
      GpxResampleMethodEnum.VISVALINGAM_WHYATT,
      GpxDistanceMethodEnum.HAVERSINE,
    );

    expect(resampledVWMB.geometry.coordinates.length).toEqual(572);
  });
});
