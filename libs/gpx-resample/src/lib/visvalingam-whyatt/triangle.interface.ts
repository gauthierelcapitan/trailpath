export interface Triangle {
  [K: number]: number[];
  index?: number;
  next?: Triangle;
  previous?: Triangle;
}
