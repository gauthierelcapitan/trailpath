import { glassBackground, glassBackgroundHover } from '@trailpath/theme.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style([
  glassBackground,
  glassBackgroundHover,
  {
    position: 'fixed',
    top: '30px',
    left: '30px',
    transform: 'rotate(-.015turn)',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
]);
