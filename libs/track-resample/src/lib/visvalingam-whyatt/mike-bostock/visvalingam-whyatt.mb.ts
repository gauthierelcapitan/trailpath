import { Position } from 'geojson';

import { ResampleAlgorithmAbstract } from '../../resample-algorithm.abstract';
import { Heap } from './heap';

export interface VisvalingamWhyattParam {
  minArea: number;
}

const DEFAULT_MIN_AREA = 15000;

export interface Triangle {
  [K: number]: number[];
  index?: number;
  next?: Triangle;
  previous?: Triangle;
}

/**
 * Implementation of Visvalingam-Whyatt algorithm.
 *
 * Code inspired by https://gist.github.com/msbarry/9152218
 **/
export class VisvalingamWhyattMb implements ResampleAlgorithmAbstract {
  stats: { [K: number]: number } = {};

  heap: Heap = new Heap();

  resample(
    coordinates: Position[],
    params: VisvalingamWhyattParam = { minArea: DEFAULT_MIN_AREA },
  ): Position[] {
    const { minArea } = params;

    return this.simplifyVisvalingam(coordinates, minArea);
  }

  simplifyVisvalingam(position: Position[], pointsToKeep: number) {
    const start: number = new Date().getTime();
    let maxArea = 0;
    let triangle: Triangle;
    const triangles: Triangle[] = [];
    const points = position.map(function (d) {
      return d.slice(0, 2);
    });

    for (let i = 1, n = points.length - 1; i < n; ++i) {
      triangle = points.slice(i - 1, i + 2);

      triangle[1][2] = this.area(triangle);

      if (triangle[1][2]) {
        triangles.push(triangle);
        this.heap.push(triangle);
      }
    }

    for (let i = 0, n = triangles.length; i < n; ++i) {
      triangle = triangles[i];
      triangle.previous = triangles[i - 1];
      triangle.next = triangles[i + 1];
    }

    //console.log('triangle', triangles);

    while ((triangle = this.heap.pop())) {
      // If the area of the current point is less than that of the previous point
      // to be eliminated, use the latters area instead. This ensures that the
      // current point cannot be eliminated without eliminating previously-
      // eliminated points.
      if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
      else maxArea = triangle[1][2];

      if (triangle.previous) {
        triangle.previous.next = triangle.next;
        triangle.previous[2] = triangle[2];
        this.update(triangle.previous);
      } else {
        triangle[0][2] = triangle[1][2];
      }

      if (triangle.next) {
        triangle.next.previous = triangle.previous;
        triangle.next[0] = triangle[0];
        this.update(triangle.next);
      } else {
        triangle[2][2] = triangle[1][2];
      }
    }

    const weights = points.map(function (d) {
      return d.length < 3 ? Infinity : (d[2] += Math.random()); /* break ties */
    });
    weights.sort(function (a, b) {
      return b - a;
    });

    const result = points.filter(function (d) {
      return d[2] > weights[pointsToKeep];
    });
    const end = new Date().getTime();
    this.stats[pointsToKeep] = end - start;

    return result;
  }

  private area(triangle: Triangle): number {
    return Math.abs(
      (triangle[0][0] - triangle[2][0]) * (triangle[1][1] - triangle[0][1]) -
        (triangle[0][0] - triangle[1][0]) * (triangle[2][1] - triangle[0][1]),
    );
  }

  private update(triangle: Triangle) {
    this.heap.remove(triangle);
    triangle[1][2] = this.area(triangle);
    this.heap.push(triangle);
  }
}
