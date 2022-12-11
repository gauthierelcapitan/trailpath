import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import ColorPalette from './color-palette/color-palette';
import { ICanvas } from 'pixi.js';
import Orb from './orb/orb';
import { orbCanvas } from './orb-background.css';

export function OrbBackground() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (document && !initializedRef?.current) {
      const app = new PIXI.Application({
        view: document.querySelector('.orb-canvas') as unknown as ICanvas,
        resizeTo: window,
        backgroundAlpha: 0,
      } as PIXI.IApplicationOptions);

      app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

      // Create colour palette
      const colorPalette = new ColorPalette();

      // Create orbs
      const orbs: Orb[] = [];

      for (let i = 0; i < 10; i++) {
        const orb = new Orb(colorPalette.randomColor());

        app.stage.addChild(orb.graphics);

        orbs.push(orb);
      }

      // Animate
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        app.ticker.add(() => {
          orbs.forEach((orb) => {
            orb.update();
            orb.render();
          });
        });
      } else {
        orbs.forEach((orb) => {
          orb.update();
          orb.render();
        });
      }
      initializedRef.current = true;
    }
  }, []);

  return <canvas className={['orb-canvas', orbCanvas].join(' ')} />;
}

export default OrbBackground;
