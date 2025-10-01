import Link from 'next/link';
import React from 'react';
import { cn } from '@/utils/cn';

export type LogoProps = {
  href?: string;
  label?: string;
  className?: string;
};
const Logo: React.FC<LogoProps> = ({ href = '/', label = 'Iruka', className }) => (
  <Link href={href} className={cn('inline-flex items-center font-extrabold text-sky-600 text-xl', className)}>
    🐳 <span className="ml-2 text-3xl">{label}</span>
  </Link>
);
export default Logo;
