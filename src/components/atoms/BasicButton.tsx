import React from 'react';
import { cn } from '@/utils/cn';

export type BasicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const BASE =
  'inline-flex items-center justify-center rounded-2xl transition active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed';
const VARIANT: Record<string, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700',
  secondary: 'bg-white text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50',
  ghost: 'bg-transparent text-sky-700 hover:bg-sky-50',
};
const SIZE: Record<string, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const BasicButton = ({
  ref,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}: BasicButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => (
  <button type="button" ref={ref} className={cn(BASE, VARIANT[variant], SIZE[size], className)} {...rest}>
    {iconLeft && <span className="mr-2">{iconLeft}</span>}
    {children}
    {iconRight && <span className="ml-2">{iconRight}</span>}
  </button>
);
BasicButton.displayName = 'BasicButton';
export default BasicButton;
