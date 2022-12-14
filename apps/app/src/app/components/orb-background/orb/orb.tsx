// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { map, random } from '@georgedoescode/generative-utils';
import debounce from 'debounce';
import * as PIXI from 'pixi.js';
import { createNoise2D } from 'simplex-noise';

import { OrbBoundInterface } from './orb.interface';

const noise2D = createNoise2D();

/**
 * Orb class
 */
class Orb {
  x = 0;
  y = 0;
  bounds: OrbBoundInterface = {
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  };
  scale = 1;
  fill = 0x000000;
  radius = 0;
  graphics: PIXI.Graphics = new PIXI.Graphics();
  xOff = 0;
  yOff = 0;
  inc = 0;

  // Pixi takes hex colors as hexadecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // Bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds();

    // Initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds['x'].min, this.bounds['x'].max);
    this.y = random(this.bounds['y'].min, this.bounds['y'].max);

    // How large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1;

    // What color is the orb?
    this.fill = fill;

    // The original radius of the orb, set relative to window height
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    // Starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);

    // How quickly the noise/self similar random values step through time
    this.inc = 0.002;

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics.alpha = 0.825;

    // 250ms after the last window resize event, recalculate orb positions.
    // TODO REMOVE
    window.addEventListener(
      'resize',
      debounce(() => {
        this.bounds = this.setBounds();
      }, 250),
    );
  }

  setBounds(): OrbBoundInterface {
    // How far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;

    // The { x, y } origin for each orb (the bottom right of the screen)
    const originX = window.innerWidth / 1.25;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    // Allow each orb to move x distance away from it's x / y origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist,
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist,
      },
    };
  }

  update() {
    // Self similar "pseudo-random" or noise values at a given point in "time"
    const xNoise = noise2D(this.xOff, this.xOff);
    const yNoise = noise2D(this.yOff, this.yOff);
    const scaleNoise = noise2D(this.xOff, this.yOff);

    // Map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds['x'].min, this.bounds['x'].max);
    this.y = map(yNoise, -1, 1, this.bounds['y'].min, this.bounds['y'].max);

    // Map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // Step through "time"
    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    // Update the PIXI.Graphics position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // Clear anything currently drawn to graphics
    this.graphics.clear();

    // Tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill);

    // Draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(0, 0, this.radius);

    // Let graphics know we won't be filling in any more shapes
    this.graphics.endFill();
  }
}

export default Orb;
