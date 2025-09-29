import React from 'react';
import Logo from '../atoms/Logo';
import NavList from '../molecules/NavList';

export type LeftNavProps = {
  items: { icon?: string; label: string; href?: string; active?: boolean }[];
  className?: string;
};

const LeftNav: React.FC<LeftNavProps> = ({ items }) => (
  <aside className="hidden h-screen border-r-2 border-slate-700 bg-slate-900 p-4 text-slate-100 lg:flex lg:w-[256px] lg:flex-col">
    <div className="mb-6"><Logo label="Iruka" className="my-2" /></div>
    <NavList items={items} />
    <div className="mt-auto text-xs text-slate-700">v0.1</div>
  </aside>
);

export default LeftNav;
