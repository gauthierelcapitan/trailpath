import { Position } from 'geojson';

export abstract class GpxResampleAbstract {
  abstract resample(
    coordinates: Position[],
    positionsToKeep: number,
  ): Position[];
}
