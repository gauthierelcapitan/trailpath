import { Position } from 'geojson';

import { ResampleAlgorithmAbstract } from '../../resample-algorithm.abstract';

export interface VisvalingamWhyattParam {
  minArea: number;
}

const DEFAULT_MIN_AREA = 30000;

/**
 * Implementation of Visvalingam-Whyatt algorithm.
 *
 * Code inspired by https://gitlab.com/sbrl/line-simplification
 **/
export class VisvalingamWhyattSbrl implements ResampleAlgorithmAbstract {
  resample(
    coordinates: Position[],
    params: VisvalingamWhyattParam = { minArea: DEFAULT_MIN_AREA },
  ): Position[] {
    const { minArea } = params;

    // 3+ positions are needed to use this algorithm!
    if (coordinates.length < 3) return coordinates;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let smallestArea = Number.MAX_SAFE_INTEGER,
        smallestAreaI = 1;

      for (let i = 1; i < coordinates.length - 1; i++) {
        const nextArea = this.triangleArea(
          coordinates[i - 1],
          coordinates[i],
          coordinates[i + 1],
        );

        if (nextArea < smallestArea) {
          smallestArea = nextArea;
          smallestAreaI = i;
        }
      }

      if (coordinates.length <= minArea) break;

      // Remove the central point of the smallest triangle
      coordinates.splice(smallestAreaI, 1);
    }

    return coordinates;
  }

  /**
   * Calculates the area of a triangle with the vertices a, b, and c.
   */
  private triangleArea(a: Position, b: Position, c: Position): number {
    return Math.abs(
      (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])) / 2,
    );
  }
}
