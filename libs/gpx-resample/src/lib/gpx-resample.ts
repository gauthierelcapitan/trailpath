import { GpxDistanceMethodEnum, length } from '@trailpath/gpx-distance';
import { Feature, LineString } from 'geojson';

import { GpxResampleAbstract } from './gpx-resample.abstract';
import { GpxResampleMethodEnum } from './gpx-resample-method.enum';
import { RamerDouglasPeucker } from './ramer-douglas-peucker/ramer-douglas-peucker';
import { VisvalingamWhyatt } from './visvalingam-whyatt/visvalingam-whyatt';

/**
 * Distance between two coordinates in meters.
 */
const DISTANCE_BETWEEN_COORDINATES_THRESHOLD = 8;

export const methodMapping: {
  [method in GpxResampleMethodEnum]: GpxResampleAbstract;
} = {
  RAMER_DOUGLAS_PEUCKER: new RamerDouglasPeucker(),
  VISVALINGAM_WHYATT: new VisvalingamWhyatt(),
};

export function resample(
  lineString: Feature<LineString>,
  resampleMethod: GpxResampleMethodEnum,
  distanceMethod: GpxDistanceMethodEnum,
): Feature<LineString> {
  const result = JSON.parse(JSON.stringify(lineString));

  const pointsToKeep = evaluatePointsToKeep(result, distanceMethod);

  result.geometry.coordinates = methodMapping[resampleMethod].resample(result.geometry.coordinates, pointsToKeep);

  return result;
}

function evaluatePointsToKeep(lineString: Feature<LineString>, distanceMethod: GpxDistanceMethodEnum) {
  const coordinatesLength = length(lineString, distanceMethod);

  return Math.ceil(coordinatesLength / DISTANCE_BETWEEN_COORDINATES_THRESHOLD);
}
