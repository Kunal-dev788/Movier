import Logo from "./Logo";
import type { ReactNode } from "react";

type NavbarProps = {
  children: ReactNode;
};

function Navbar({ children }: NavbarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;
