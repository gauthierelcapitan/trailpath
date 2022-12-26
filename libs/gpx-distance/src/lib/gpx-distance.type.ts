import { Position } from 'geojson';

export type LengthReducer = {
  length: number;
  previousCoord?: Position;
};
