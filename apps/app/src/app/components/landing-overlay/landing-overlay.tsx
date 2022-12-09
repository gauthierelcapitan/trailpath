import React from 'react';
import { overlayInner, overlay } from './landing-overlay.css';
import Logo from '../logo/logo';
import { theme } from '@trailpath/theme.css';

export function LandingOverlay() {
  return (
    <div className={overlay}>
      <div className={overlayInner}>
        <Logo color={theme.color.white[500]} />
      </div>
    </div>
  );
}
