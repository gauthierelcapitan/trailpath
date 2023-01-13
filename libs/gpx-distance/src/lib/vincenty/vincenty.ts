import { Position } from 'geojson';

import { GpxDistanceAbstract } from '../gpx-distance.abstract';
import { WGS_84_ELLIPSOID } from '../gpx-distance.constant';
import { toMillimeterPrecision, toRadians } from '../gpx-distance.util';

const { a, b, f } = WGS_84_ELLIPSOID;

/**
 * Implementation of Vincenty formula.
 *
 * Code inspired by https://www.jameslmilner.com/posts/measuring-the-world-with-javascript/.
 **/
export class Vincenty implements GpxDistanceAbstract {
  distance([lon1, lat1]: Position, [lon2, lat2]: Position): number {
    const phiOne = toRadians(lat1);
    const lambda1 = toRadians(lon1);
    const phiTwo = toRadians(lat2);
    const lambda2 = toRadians(lon2);

    const L = lambda2 - lambda1; // L = difference in longitude, U = reduced latitude, defined by tan U = (1-f)·tanphi.
    const tanU1 = (1 - f) * Math.tan(phiOne),
      cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1),
      sinU1 = tanU1 * cosU1;
    const tanU2 = (1 - f) * Math.tan(phiTwo),
      cosU2 = 1 / Math.sqrt(1 + tanU2 * tanU2),
      sinU2 = tanU2 * cosU2;

    const antipodal = Math.abs(L) > Math.PI / 2 || Math.abs(phiTwo - phiOne) > Math.PI / 2;

    let lambda = L,
      sinLambda = null,
      cosLambda = null; // lambda = difference in longitude on an auxiliary sphere
    let sigma = antipodal ? Math.PI : 0,
      sinSigma = 0,
      cosSigma = antipodal ? -1 : 1,
      sinSqSigma = null; // sigma = angular distance P₁ P₂ on the sphere
    let cos2sigmaM = 1; // sigmaM = angular distance on the sphere from the equator to the midpoint of the line
    let sinAlpha = null,
      cosSqAlpha = 1; // alpha = azimuth of the geodesic at the equator
    let C = null;

    let lambdaPrime = null,
      iterations = 0;
    do {
      sinLambda = Math.sin(lambda);
      cosLambda = Math.cos(lambda);
      sinSqSigma =
        cosU2 * sinLambda * (cosU2 * sinLambda) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);

      if (Math.abs(sinSqSigma) < Number.EPSILON) {
        break; // co-incident/antipodal points (falls back on lambda/sigma = L)
      }

      sinSigma = Math.sqrt(sinSqSigma);
      cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
      sigma = Math.atan2(sinSigma, cosSigma);
      sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
      cosSqAlpha = 1 - sinAlpha * sinAlpha;
      cos2sigmaM = cosSqAlpha != 0 ? cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha : 0; // on equatorial line cos²alpha = 0 (§6)
      C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
      lambdaPrime = lambda;
      lambda =
        L +
        (1 - C) *
          f *
          sinAlpha *
          (sigma + C * sinSigma * (cos2sigmaM + C * cosSigma * (-1 + 2 * cos2sigmaM * cos2sigmaM)));
      const iterationCheck = antipodal ? Math.abs(lambda) - Math.PI : Math.abs(lambda);
      if (iterationCheck > Math.PI) {
        throw new Error('lambda > Math.PI');
      }
    } while (Math.abs(lambda - lambdaPrime) > 1e-12 && ++iterations < 1000);
    if (iterations >= 1000) {
      throw new Error('Vincenty formula failed to converge');
    }

    const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
    const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    const deltaSigma =
      B *
      sinSigma *
      (cos2sigmaM +
        (B / 4) *
          (cosSigma * (-1 + 2 * cos2sigmaM * cos2sigmaM) -
            (B / 6) * cos2sigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2sigmaM * cos2sigmaM)));

    const distance = b * A * (sigma - deltaSigma); // distance = length of the geodesic

    return toMillimeterPrecision(distance);
  }
}
