/**
 * Return a random number within a range
 */
export function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Map a number from 1 range to another
 */
export function mapInRange(n: number, start1: number, end1: number, start2: number, end2: number): number {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}
