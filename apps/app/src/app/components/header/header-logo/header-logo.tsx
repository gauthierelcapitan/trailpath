import Logo from '@trailpath/app/components/logo/logo';
import React from 'react';

import { wrapper } from './header-logo.css';

export function HeaderLogo() {
  return (
    <div className={wrapper}>
      <Logo width={204} height={25} />
    </div>
  );
}

export default HeaderLogo;
