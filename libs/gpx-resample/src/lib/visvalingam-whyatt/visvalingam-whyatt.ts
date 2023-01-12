import { Position } from 'geojson';

import { GpxResampleAbstract } from '../gpx-resample.abstract';
import { Heap } from './heap';
import { Triangle } from './triangle.interface';

/**
 * Implementation of Visvalingam-Whyatt algorithm.
 *
 * Code inspired by https://gist.github.com/msbarry/9152218
 **/
export class VisvalingamWhyatt implements GpxResampleAbstract {
  heap: Heap = new Heap();

  resample(coordinates: Position[], positionsToKeep: number): Position[] {
    let maxArea = 0;
    let triangle: Triangle;
    const triangles: Triangle[] = [];
    const points = coordinates.map(function (d) {
      return d.slice(0, 3);
    });

    for (let i = 1, n = points.length - 1; i < n; ++i) {
      triangle = points.slice(i - 1, i + 2);

      triangle[1][3] = this.area(triangle);

      if (triangle[1][3]) {
        triangles.push(triangle);
        this.heap.push(triangle);
      }
    }

    for (let i = 0, n = triangles.length; i < n; ++i) {
      triangle = triangles[i];
      triangle.previous = triangles[i - 1];
      triangle.next = triangles[i + 1];
    }

    while ((triangle = this.heap.pop())) {
      // If the area of the current point is less than that of the previous point
      // to be eliminated, use the latters area instead. This ensures that the
      // current point cannot be eliminated without eliminating previously
      // eliminated points.
      if (triangle[1][3] < maxArea) triangle[1][3] = maxArea;
      else maxArea = triangle[1][3];

      if (triangle.previous) {
        triangle.previous.next = triangle.next;
        triangle.previous[3] = triangle[3];
        this.update(triangle.previous);
      } else {
        triangle[0][3] = triangle[1][3];
      }

      if (triangle.next) {
        triangle.next.previous = triangle.previous;
        triangle.next[0] = triangle[0];
        this.update(triangle.next);
      } else {
        triangle[2][3] = triangle[1][3];
      }
    }

    const weights = points.map(function (d) {
      return d.length < 3 ? Infinity : (d[3] += Math.random()); /* break ties */
    });
    weights.sort(function (a, b) {
      return b - a;
    });

    return points
      .filter(function (d) {
        return d[3] > weights[positionsToKeep];
      })
      .map((point) => point.slice(0, 3));
  }

  private area(triangle: Triangle): number {
    return Math.abs(
      (triangle[0][0] - triangle[2][0]) * (triangle[1][1] - triangle[0][1]) -
        (triangle[0][0] - triangle[1][0]) * (triangle[2][1] - triangle[0][1]),
    );
  }

  private update(triangle: Triangle) {
    this.heap.remove(triangle);
    triangle[1][3] = this.area(triangle);
    this.heap.push(triangle);
  }
}
