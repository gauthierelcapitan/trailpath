import { Container, SVG } from '@svgdotjs/svg.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { random, map, spline } from '@georgedoescode/generative-utils';
import * as tinycolor from 'tinycolor2';
import { canvas, canvasWrapper } from './wave-background.css';

import React, { useEffect, useRef } from 'react';

export function WaveBackground() {
  const initializedRef = useRef(false);

  function lerp(v0: number, v1: number, t: number): number {
    return v0 * (1 - t) + v1 * t;
  }

  useEffect(() => {
    if (document && !initializedRef?.current) {
      const svg: Container = SVG('.canvas') as unknown as Container;
      const { width, height } = svg.viewbox();

      function wave(svg: Container, start, end, gradient) {
        const numSteps = random(4, 8, true);
        const randomRange = random(32, 64);

        const points = [];

        for (let i = 0; i <= numSteps; i++) {
          const step = map(i, 0, numSteps, 0, 1);

          let x = lerp(start.x, end.x, step);
          let y = lerp(start.y, end.y, step);

          if (i !== 0 && i !== numSteps) {
            x += random(-randomRange, randomRange);
            y += random(-randomRange, randomRange);
          }

          points.push({ x, y });
        }

        const pathData =
          spline(points, 1, false) +
          `L ${end.x} ${height} L ${start.x} ${height} Z`;

        svg.path(pathData).attr('fill', gradient);
      }

      function generate() {
        const numWaves = 7;
        const base = tinycolor(`hsl(${random(220, 360)}, 65%, 55%)`);
        const colors = base.analogous(6);

        svg
          .rect(width, height)
          .fill(random(colors).clone().darken(40).toString());

        for (let i = 0; i < numWaves; i++) {
          const randomOffset = random(-50, 50);
          const originY =
            map(i, 0, numWaves, -height / 2, height / 3) + randomOffset;
          const endY = map(i, 0, numWaves, 0, 1000) + randomOffset;

          const color = random(colors).clone();

          if (i < 3) {
            color.darken(50).desaturate(10);
          }

          const gradientOffset = map(i, 0, numWaves, 0.1, 1);

          const gradient = svg.gradient('linear', function (add) {
            add.stop(0, color.clone().lighten(30).toHexString());
            add.stop(gradientOffset, color.clone().spin(60).toHexString());
          });

          gradient.from(0.5, 0).to(0, 1);

          wave({ x: 0, y: originY }, { x: width, y: endY }, gradient);
        }
      }

      generate();
      initializedRef.current = true;
    }
  }, []);

  return (
    <div className={canvasWrapper}>
      <svg
        className={['canvas', canvas].join(' ')}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMaxYMid slice"
      />
    </div>
  );
}

export default WaveBackground;
