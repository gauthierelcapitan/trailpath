import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { utmbOffical2022 } from '@trailpath/gpx-shared';

import { distanceElevation } from './gpx-distance-elevation';

describe('gpxDistanceElevation', () => {
  it('should calculate distance elevation for given linestring', () => {
    const { distance, distance3d, elevationLoss, elevationGain } = distanceElevation(
      utmbOffical2022,
      3,
      GpxDistanceMethodEnum.VINCENTY,
    );

    expect(distance).toEqual(168372.978);
    expect(distance3d).toEqual(170210.967);
    expect(elevationLoss).toEqual(10236);
    expect(elevationGain).toEqual(10236);
  });
});
