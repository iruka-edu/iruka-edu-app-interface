'use client';

import { ArrowUp } from 'lucide-react';

const ScrollButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="inline-flex size-12 cursor-pointer items-center justify-center rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#12222b] text-2xl text-[#46d5ff] shadow-[0_6px_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#a9e34b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a20] focus-visible:outline-none"
      aria-label="Back to top"
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollButton;
