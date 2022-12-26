import { Position } from 'geojson';

export abstract class GpxDistanceAbstract {
  abstract distance(coordinateA: Position, coordinateB: Position): number;
}
