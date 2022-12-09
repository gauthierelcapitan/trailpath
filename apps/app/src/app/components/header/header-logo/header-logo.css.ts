import { style } from '@vanilla-extract/css';
import { glassBackground, glassBackgroundHover } from '../../../../theme.css';

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
