import { wrapper } from './landing.css';
import React, { PropsWithChildren } from 'react';

export function Landing({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return <div className={wrapper}>{children}</div>;
}

export default Landing;
