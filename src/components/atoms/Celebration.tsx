import * as React from 'react';

export default function Celebration() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
  }, []);
  return (
    <div aria-live="polite" className="grid place-items-center py-8">
      <div className="text-3xl">{reduced ? '🎊' : '🎉✨🎉'}</div>
      <p className="mt-2 text-sm text-[--muted]">Great job! Keep it up.</p>
    </div>
  );
}
