import { Position } from 'geojson';

import { GpxDistanceAbstract } from '../gpx-distance.abstract';
import { WGS_84_ELLIPSOID } from '../gpx-distance.constant';
import { toMillimeterPrecision, toRadians } from '../gpx-distance.util';

const { a: radius } = WGS_84_ELLIPSOID;

/**
 * Implementation of Haversine formula.
 *
 * Code inspired by https://github.com/dcousens/haversine-distance.
 **/
export class Haversine implements GpxDistanceAbstract {
  distance([lon1, lat1]: Position, [lon2, lat2]: Position): number {
    const phiOne = toRadians(lat1);
    const lambdaOne = toRadians(lon1);
    const phiTwo = toRadians(lat2);
    const lambdaTwo = toRadians(lon2);
    const deltaPhi = phiTwo - phiOne;
    const deltaLambda = lambdaTwo - lambdaOne;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phiOne) * Math.cos(phiTwo) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return toMillimeterPrecision(radius * c);
  }
}
