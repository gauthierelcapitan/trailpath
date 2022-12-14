import { theme } from '@trailpath/theme.css';
import React from 'react';

import Logo from '../logo/logo';
import { overlay, overlayInner } from './landing-overlay.css';

export function LandingOverlay() {
  return (
    <div className={overlay}>
      <div className={overlayInner}>
        <Logo color={theme.color.white[500]} />
      </div>
    </div>
  );
}
