import { Position } from 'geojson';

import { ResampleAlgorithmAbstract } from '../resample-algorithm.abstract';
import { Line } from './line';

export interface RamerDouglasPeuckerParam {
  tolerance: number;
}

const DEFAULT_TOLERANCE = 0.00001;

/**
 * Implementation of Ramer–Douglas–Peucker algorithm.
 *
 * Code inspired by https://github.com/seabre/simplify-geometry
 **/
export class RamerDouglasPeucker implements ResampleAlgorithmAbstract {
  resample(
    coordinates: Position[],
    params: RamerDouglasPeuckerParam = { tolerance: DEFAULT_TOLERANCE },
  ): Position[] {
    const { tolerance } = params;

    let results;
    let dMax = 0;
    let index = 0;

    for (let i = 1; i <= coordinates.length - 2; i++) {
      const d = new Line(
        coordinates[0],
        coordinates[coordinates.length - 1],
      ).perpendicularDistance(coordinates[i]);
      if (d > dMax) {
        index = i;
        dMax = d;
      }
    }

    if (dMax > tolerance) {
      const results_one = this.resample(coordinates.slice(0, index), {
        tolerance,
      });
      const results_two = this.resample(
        coordinates.slice(index, coordinates.length),
        { tolerance },
      );

      results = results_one.concat(results_two);
    } else if (coordinates.length > 1) {
      results = [coordinates[0], coordinates[coordinates.length - 1]];
    } else {
      results = [coordinates[0]];
    }

    return results;
  }
}
