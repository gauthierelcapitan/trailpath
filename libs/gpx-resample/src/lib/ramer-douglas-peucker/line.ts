import { Position } from 'geojson';

import { distSquared } from '../gpx-resample.utils';

export class Line {
  positionA: Position;
  positionB: Position;
  lengthSquared: number;

  constructor(positionA: Position, positionB: Position) {
    this.positionA = positionA;
    this.positionB = positionB;
    this.lengthSquared = distSquared(positionA, positionB);
  }

  public distanceToSquared(position: Position) {
    const ratio = this.getRatio(position);

    if (ratio < 0) {
      return distSquared(position, this.positionA);
    }
    if (ratio > 1) {
      return distSquared(position, this.positionB);
    }

    return distSquared(position, [
      this.positionA[0] + ratio * (this.positionB[0] - this.positionA[0]),
      this.positionA[1] + ratio * (this.positionB[1] - this.positionA[1]),
    ]);
  }

  private getRatio(position: Position) {
    if (this.lengthSquared === 0) {
      return distSquared(position, this.positionA);
    }
    return (
      ((position[0] - this.positionA[0]) *
        (this.positionB[0] - this.positionA[0]) +
        (position[1] - this.positionA[1]) *
          (this.positionB[1] - this.positionA[1])) /
      this.lengthSquared
    );
  }
}
