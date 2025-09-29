import type { NavItemProps } from './NavItem';
import React from 'react';
import NavItem from './NavItem';

export type NavListProps = {
  items: NavItemProps[];
};

const NavList: React.FC<NavListProps> = ({ items }) => (
  <nav className="flex flex-col gap-2">
    {items.map(it => <NavItem key={it.label} {...it} />)}
  </nav>
);

export default NavList;
