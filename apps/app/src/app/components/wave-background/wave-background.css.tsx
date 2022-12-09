import { style } from '@vanilla-extract/css';

export const canvasWrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -2,
  overflow: 'hidden',
});

export const canvas = style({
  width: '100vw',
  height: '100vh',
});
