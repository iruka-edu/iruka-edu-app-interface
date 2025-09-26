import posthog from 'posthog-js';
import * as React from 'react';

export function useExperiment(flag: string, fallback: boolean = false) {
  const [enabled, setEnabled] = React.useState(fallback);
  React.useEffect(() => {
    try {
      const v = posthog.isFeatureEnabled?.(flag);
      if (typeof v === 'boolean') {
        setEnabled(v);
      }
    } catch {}
  }, [flag]);
  return enabled;
}
