import BasicIcon from '@atoms/BasicIcon';
import Text from '@atoms/Text';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/utils/cn';

export type NavItemProps = {
  icon?: React.ReactElement | string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, href = '#', active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      'flex items-center gap-4 px-4 py-2 rounded-lg transition',
      active ? 'bg-slate-800 text-white ring-2 ring-blue-500' : 'text-slate-200 hover:bg-slate-800/20',
    )}
  >
    {typeof icon === 'string' ? <BasicIcon name={icon} ariaLabel={label} size={32} /> : icon}
    <Text variant="body" weight={active ? 'semibold' : 'normal'} className={`truncate ${active ? 'text-blue-500' : 'text-slate-200'}`}>{label}</Text>
  </Link>
);

export default NavItem;
