export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * The length of this vector squared.
   */
  get lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Get the length of the current vector.
   */
  get length(): number {
    return Math.sqrt(this.lengthSquared);
  }
}
