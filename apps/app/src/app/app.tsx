import React from 'react';

import Header from './components/header/header';
import Landing from './components/landing/landing';
import { LandingOverlay } from './components/landing-overlay/landing-overlay';
import OrbBackground from './components/orb-background/orb-background';
import WaveBackground from './components/wave-background/wave-background';

export function App() {
  return (
    <Landing>
      <Header />
      <WaveBackground />
      <OrbBackground />
      <LandingOverlay />
    </Landing>
  );
}

export default App;
