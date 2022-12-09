import { header } from './header.css';
import React from 'react';
import HeaderLogo from './header-logo/header-logo';
import HeaderSlogan from './header-sologan/header-slogan';

export function Header() {
  return (
    <header className={header}>
      <HeaderSlogan />
      <HeaderLogo />
    </header>
  );
}

export default Header;
