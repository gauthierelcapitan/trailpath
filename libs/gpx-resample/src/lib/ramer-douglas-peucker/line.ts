import { Position } from 'geojson';

export class Line {
  p1: Position;
  p2: Position;

  constructor(p1: Position, p2: Position) {
    this.p1 = p1;
    this.p2 = p2;
  }

  rise(): number {
    return this.p2[1] - this.p1[1];
  }

  run(): number {
    return this.p2[0] - this.p1[0];
  }

  slope(): number {
    return this.rise() / this.run();
  }

  yIntercept(): number {
    return this.p1[1] - this.p1[0] * this.slope();
  }

  isVertical(): boolean {
    return !isFinite(this.slope());
  }

  isHorizontal(): boolean {
    return this.p1[1] == this.p2[1];
  }

  private perpendicularDistanceHorizontal(point: Position): number {
    return Math.abs(this.p1[1] - point[1]);
  }

  private perpendicularDistanceVertical(point: Position): number {
    return Math.abs(this.p1[0] - point[0]);
  }

  private perpendicularDistanceHasSlope(point: Position): number {
    const slope = this.slope();
    const y_intercept = this.yIntercept();

    return (
      Math.abs(slope * point[0] - point[1] + y_intercept) /
      Math.sqrt(Math.pow(slope, 2) + 1)
    );
  }

  perpendicularDistance(point: Position): number {
    if (this.isVertical()) {
      return this.perpendicularDistanceVertical(point);
    } else if (this.isHorizontal()) {
      return this.perpendicularDistanceHorizontal(point);
    } else {
      return this.perpendicularDistanceHasSlope(point);
    }
  }
}
