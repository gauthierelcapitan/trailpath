import { Position } from 'geojson';

export function sqr(x: number) {
  return x * x;
}

export function distSquared(positionA: Position, positionB: Position) {
  return sqr(positionA[0] - positionB[0]) + sqr(positionA[1] - positionB[1]);
}
