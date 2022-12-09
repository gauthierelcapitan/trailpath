import React from 'react';
import { LandingOverlay } from './components/landing-overlay/landing-overlay';
import OrbBackground from './components/orb-background/orb-background';
import Landing from './components/landing/landing';
import WaveBackground from './components/wave-background/wave-background';
import Header from './components/header/header';

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
