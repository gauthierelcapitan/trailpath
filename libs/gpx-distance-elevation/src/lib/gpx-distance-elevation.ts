import { distance, GpxDistanceMethodEnum, length } from '@trailpath/gpx-distance';
import { toMeterPrecision, toMillimeterPrecision } from '@trailpath/gpx-distance';
import { Feature, LineString, Position } from 'geojson';

import { GpxDistanceElevationInterface } from './gpx-distance-elevation.interface';

export function distanceElevation(
  lineString: Readonly<Feature<LineString>>,
  threshold: number,
  distanceMethod: GpxDistanceMethodEnum,
): GpxDistanceElevationInterface {
  const { coordinates } = lineString.geometry;

  // Variables to store cumulative elevation gain and loss
  let elevationGain = 0;
  let elevationLoss = 0;

  // Variable to store the previous position and the previous threshold position
  let previousPoint: Position = lineString.geometry.coordinates[0];
  let previousThresholdPoint: Position = lineString.geometry.coordinates[0];

  // Variable to store 2d distances from last point and last threshold position
  let distance2dFromPreviousPoint = 0;
  let distance2dFromPreviousThreshold = 0;

  // Variable to store 3d distances, from start to current point, from start to last threshold and from last threshold
  let distance3d = 0;
  let distance3dToThreshold = 0;
  let distance3dFromThreshold = 0;

  for (let i = 1; i < coordinates.length; i++) {
    const point = coordinates[i];

    // Ignore points without elevation
    if (hasElevation(point)) {
      distance2dFromPreviousPoint = distance(point, previousPoint, distanceMethod);

      if (isAboveThreshold(point, previousThresholdPoint, threshold)) {
        const elevationDifferenceFromPreviousThreshold = getElevationDifference(point, previousThresholdPoint);
        distance2dFromPreviousThreshold += distance2dFromPreviousPoint;

        distance3dFromThreshold = getHypotenuse(
          distance2dFromPreviousThreshold,
          elevationDifferenceFromPreviousThreshold,
        );

        if (point[2] >= previousThresholdPoint[2]) {
          elevationGain += elevationDifferenceFromPreviousThreshold;
        } else {
          elevationLoss += elevationDifferenceFromPreviousThreshold;
        }

        previousThresholdPoint = point;

        distance3d = distance3dToThreshold + distance3dFromThreshold;
        distance3dToThreshold = distance3d;
        distance2dFromPreviousThreshold = 0;
      } else {
        distance2dFromPreviousThreshold += distance2dFromPreviousPoint;
        distance3d += distance2dFromPreviousPoint;
      }

      previousPoint = point;
    }
  }

  return {
    distance: length(lineString, distanceMethod),
    distance3d: toMillimeterPrecision(distance3d),
    elevationGain: toMeterPrecision(elevationGain),
    elevationLoss: toMeterPrecision(elevationLoss),
  };
}

function isAboveThreshold(point: Position, previousPoint: Position, threshold: number): boolean {
  return point[2] >= previousPoint[2] + threshold || point[2] <= previousPoint[2] - threshold;
}

function hasElevation(point: Position): boolean {
  return point[2] !== undefined;
}

function getElevationDifference(pointA: Position, pointB: Position): number {
  return Math.abs(pointA[2] - pointB[2]);
}

function getHypotenuse(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}
