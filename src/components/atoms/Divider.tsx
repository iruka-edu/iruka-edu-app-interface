import React from 'react';
import { cn } from '../../../lib/utils';

const Divider: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...rest }) => (
  <hr className={cn('my-4 border-slate-200', className)} {...rest} />
);
export default Divider;
