import { Position } from 'geojson';

import { GpxResampleAbstract } from '../gpx-resample.abstract';

/**
 * Implementation of Ramer–Douglas–Peucker algorithm.
 *
 * Code inspired by https://github.com/seabre/simplify-geometry
 **/
export class RamerDouglasPeucker implements GpxResampleAbstract {
  resample(coordinates: Position[], pointsToKeep: number): Position[] {
    //const tolerance = DEFAULT_TOLERANCE;
    //
    //let results;
    //let dMax = 0;
    //let index = 0;
    //
    //for (let i = 1; i <= coordinates.length - 2; i++) {
    //  const d = new Line(
    //    coordinates[0],
    //    coordinates[coordinates.length - 1],
    //  ).perpendicularDistance(coordinates[i]);
    //  if (d > dMax) {
    //    index = i;
    //    dMax = d;
    //  }
    //}
    //
    //if (dMax > tolerance) {
    //  const results_one = this.resample(coordinates.slice(0, index));
    //  const results_two = this.resample(
    //    coordinates.slice(index, coordinates.length),
    //  );
    //
    //  results = results_one.concat(results_two);
    //} else if (coordinates.length > 1) {
    //  results = [coordinates[0], coordinates[coordinates.length - 1]];
    //} else {
    //  results = [coordinates[0]];
    //}

    return coordinates;
  }
}
