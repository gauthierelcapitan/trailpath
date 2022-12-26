import { Triangle } from './triangle.interface';

export class Heap {
  array: Triangle[] = [];

  push(...args: Triangle[]) {
    for (let i = 0, n = arguments.length; i < n; ++i) {
      const object = args[i];
      object.index = this.array.push(object) - 1;
      this.up(object.index);
    }
    return this.array.length;
  }

  pop() {
    const removed = this.array[0];
    const object = this.array.pop();
    if (this.array.length && object) {
      object.index = 0;
      this.array[0] = object;
      this.down(0);
    }
    return removed;
  }

  remove(removed: Triangle) {
    const index = removed.index;

    const object = this.array.pop();

    if (index && index !== this.array.length && object) {
      this.array[(object.index = index)] = object;
      if (this.compare(object, removed) < 0) {
        this.up(index);
      } else {
        this.down(index);
      }
    }

    return index;
  }

  private up(index: number): void {
    const object = this.array[index];
    while (index > 0) {
      const up = ((index + 1) >> 1) - 1,
        parent = this.array[up];
      if (this.compare(object, parent) >= 0) break;
      this.array[(parent.index = index)] = parent;
      this.array[(object.index = index = up)] = object;
    }
  }

  private down(index: number) {
    const object = this.array[index];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const right = (index + 1) * 2;
      const left = right - 1;
      let down = index;
      let child = this.array[down];
      if (left < this.array.length && this.compare(this.array[left], child) < 0)
        down = left
        child = this.array[left];
      if (
        right < this.array.length &&
        this.compare(this.array[right], child) < 0
      )
        child = this.array[(down = right)];
      if (down === index) break;
      this.array[(child.index = index)] = child;
      this.array[(object.index = index = down)] = object;
    }
  }

  private compare(a: Triangle, b: Triangle): number {
    return a && b ? a[1][2] - b[1][2] : 0;
  }
}
