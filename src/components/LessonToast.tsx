import * as React from 'react';
import { cn } from '@/utils/cn';

type LessonToastProps = {
  readonly title?: string;
  readonly description?: string;
  className?: string;
};

const LessonToast = ({ title, description, className }: LessonToastProps) => {
  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#58cc02] px-4 py-3 text-xl text-white shadow-2xl">
        <span>{title}</span>
        <span aria-hidden>•</span>
        <span>{description}</span>
        <h1 className="text-2xl font-black">{title}</h1>
      </div>
    </div>
  );
};

export default LessonToast;
