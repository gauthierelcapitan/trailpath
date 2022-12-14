import { glassBackground } from '@trailpath/theme.css';
import { style } from '@vanilla-extract/css';

export const overlay = style([
  glassBackground,
  {
    width: '100%',
    maxWidth: '1140px',
    maxHeight: '640px',
    padding: '8rem 6rem',
    display: 'flex',
    alignItems: 'center',
  },
]);

export const overlayInner = style({
  maxWidth: '36rem',
});
