import { style } from '@vanilla-extract/css';
import {
  glassBackground,
  glassBackgroundHover,
  theme,
} from '@trailpath/theme.css';

export const wrapper = style([
  glassBackground,
  glassBackgroundHover,
  {
    position: 'fixed',
    top: '80px',
    left: '200px',
    transform: 'rotate(.015turn)',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.font.mono,
    color: theme.color.imperialPurple[500],
  },
]);
