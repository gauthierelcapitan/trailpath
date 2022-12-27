import { Position } from 'geojson';

import { GpxResampleAbstract } from '../gpx-resample.abstract';
import { Line } from './line';

/**
 * Implementation of Ramer–Douglas–Peucker algorithm.
 *
 * Code inspired by https://gist.github.com/msbarry/9152218
 **/
export class RamerDouglasPeucker implements GpxResampleAbstract {
  weights: number[] = [];

  coordinates: Position[] = [];

  resample(coordinates: Position[], positionsToKeep: number): Position[] {
    this.coordinates = coordinates;
    this.douglasPeucker(0, coordinates.length - 1);
    this.weights[0] = Infinity;
    this.weights[this.coordinates.length - 1] = Infinity;

    // create descending weight array so to get n most important weights,
    // just find all points with weights >= weightsDescending[n]
    const weightsDescending = this.weights.slice();

    weightsDescending.sort(function (a: number, b: number) {
      return b - a;
    });

    const maxTolerance = weightsDescending[positionsToKeep - 1];
    return this.coordinates.filter((d, i) => this.weights[i] >= maxTolerance);
  }

  private douglasPeucker(start: number, end: number) {
    if (end > start + 1) {
      const line = new Line(this.coordinates[start], this.coordinates[end]);
      let maxDist = -1;
      let maxDistIndex = 0;
      let dist;
      // find point furthest off the line from start to end
      for (let i = start + 1; i < end; i += 1) {
        dist = line.distanceToSquared(this.coordinates[i]);
        if (dist > maxDist) {
          maxDist = dist;
          maxDistIndex = i;
        }
      }
      // record the weight of this point
      this.weights[maxDistIndex] = maxDist;
      // split the segment at that furthest point, and recursively invoke
      // this method to assign weights to each point in the subsegments
      this.douglasPeucker(start, maxDistIndex);
      this.douglasPeucker(maxDistIndex, end);
    }
  }
}
