import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { colFeretGeoJson } from '@trailpath/gpx-shared';

import { distance, length } from './gpx-distance';

describe('Lib :: GpxDistance', () => {
  it('should calculate distance between 2 coordinates using Haversine formula', () => {
    expect(distance([7.05324, 45.87126], [7.05323, 45.87126], GpxDistanceMethodEnum.HAVERSINE)).toEqual(0.775);
  });

  it('should calculate distance between 2 coordinates using Vincenty formula', () => {
    expect(distance([7.05324, 45.87126], [7.05323, 45.87126], GpxDistanceMethodEnum.VINCENTY)).toEqual(0.776);
  });

  it('should calculate track length using Haversine formula', () => {
    expect(length(colFeretGeoJson, GpxDistanceMethodEnum.HAVERSINE)).toEqual(4573.814);
  });

  it('should calculate track length using Vincenty formula', () => {
    expect(length(colFeretGeoJson, GpxDistanceMethodEnum.VINCENTY)).toEqual(4572.748);
  });
});
