import React, { PropsWithChildren } from 'react';

import { wrapper } from './landing.css';

export function Landing({ children }: PropsWithChildren<Record<string, unknown>>) {
  return <div className={wrapper}>{children}</div>;
}

export default Landing;
