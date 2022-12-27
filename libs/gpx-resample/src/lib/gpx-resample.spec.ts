import { GpxDistanceMethodEnum } from '@trail-path/gpx-distance';
import { colFeretGeoJson } from '@trail-path/gpx-shared';

import { resample } from './gpx-resample';
import { GpxResampleMethodEnum } from '@trail-path/gpx-resample';

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
