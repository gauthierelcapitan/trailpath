import { header } from './header.css';

export function Header({ title }: { title: string }) {
  return (
    <header className={header}>
      Hello {title}
    </header>
    )
      }

export default Header;
