import { header } from './header.css';
import React from 'react';

export function Header({ title }: { title: string }) {
  return <header className={header}>Hello {title}</header>;
}

export default Header;
