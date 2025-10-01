import Button from '@atoms/Button';
import * as React from 'react';

export default function LessonFooter(props: {
  onNext?: () => void;
  onRetry?: () => void;
  isLast?: boolean;
  disabled?: boolean;
}) {
  const { onNext, onRetry, isLast, disabled } = props;
  return (
    <div className="flex items-center justify-between border-t border-[--border] pt-3">
      <Button variant="ghost" onClick={onRetry} disabled={disabled} aria-label="Retry">
        Retry
      </Button>
      <Button onClick={onNext} disabled={disabled} aria-label={isLast ? 'Finish' : 'Next'}>
        {isLast ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
}
