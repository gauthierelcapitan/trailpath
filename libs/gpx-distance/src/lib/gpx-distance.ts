import { Feature, LineString, Position } from 'geojson';

import { GpxDistanceAbstract } from './gpx-distance.abstract';
import { LengthReducer } from './gpx-distance.type';
import { toMillimeterPrecision } from './gpx-distance.util';
import { GpxDistanceMethodEnum } from './gpx-distance-method.enum';
import { Haversine } from './haversine/haversine';
import { Vincenty } from './vincenty/vincenty';

export const methodMapping: {
  [method in GpxDistanceMethodEnum]: GpxDistanceAbstract;
} = {
  HAVERSINE: new Haversine(),
  VINCENTY: new Vincenty(),
};

export function distance(coordinateA: Position, coordinateB: Position, method: GpxDistanceMethodEnum): number {
  return methodMapping[method].distance(coordinateA, coordinateB);
}

export function length(lineString: Readonly<Feature<LineString>>, method: Readonly<GpxDistanceMethodEnum>): number {
  const { length } = lineString.geometry.coordinates.reduce<LengthReducer>(
    ({ previousCoord, length }, coord) => {
      if (previousCoord) {
        length += distance(previousCoord, coord, method);
      }

      return { previousCoord: coord, length };
    },
    { length: 0 },
  );
  return toMillimeterPrecision(length);
}
