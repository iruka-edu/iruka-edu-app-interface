// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import TooltipCard, { type TooltipCardProps } from '@molecules/TooltipCard';
import * as React from 'react';
import { Tooltip } from 'react-tooltip';

type TriggerProps = React.HTMLAttributes<HTMLElement> & {
  readonly className?: string;
};

export type LearnTooltipProps = {
  readonly id: string;
  readonly trigger: React.ReactElement<TriggerProps>;
  readonly tooltipContent: TooltipCardProps;
  readonly hoverMode?: 'auto-close' | 'toggle';
  readonly className?: string;
};

export default function LearnTooltip({ id, trigger, tooltipContent, hoverMode = 'auto-close', className }: LearnTooltipProps) {
  const tooltipId = React.useId();
  const mergedId = `${id}-${tooltipId}`;

  const rootRef = React.useRef<HTMLSpanElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleHover = React.useCallback(() => {
    setIsOpen((value) => (hoverMode === 'toggle' ? !value : true));
  }, [hoverMode]);

  const handleMouseLeave = React.useCallback(() => {
    if (hoverMode === 'auto-close') {
      handleClose();
    }
  }, [handleClose, hoverMode]);

  const handleClick = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    window.addEventListener('pointerdown', handlePointer);

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointerdown', handlePointer);
    };
  }, [handleClose, isOpen]);

  const composedTrigger = React.useMemo(() => {
    const triggerProps = trigger.props;
    return React.cloneElement(trigger, {
      'data-tooltip-id': mergedId,
      'data-tooltip-content': '',
      'data-tooltip-place': 'bottom',
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        handleClick();
        if (typeof triggerProps.onClick === 'function') {
          triggerProps.onClick(event);
        }
      },
      onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
        handleHover();
        if (typeof triggerProps.onMouseEnter === 'function') {
          triggerProps.onMouseEnter(event);
        }
      },
      onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
        handleMouseLeave();
        if (typeof triggerProps.onMouseLeave === 'function') {
          triggerProps.onMouseLeave(event);
        }
      },
      onFocus: (event: React.FocusEvent<HTMLElement>) => {
        setIsOpen(true);
        if (typeof triggerProps.onFocus === 'function') {
          triggerProps.onFocus(event);
        }
      },
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        handleClose();
        if (typeof triggerProps.onBlur === 'function') {
          triggerProps.onBlur(event);
        }
      },
    });
  }, [handleClick, handleHover, handleMouseLeave, mergedId, trigger, setIsOpen, handleClose]);

  return (
    <span ref={rootRef} className={['inline-flex items-center', className].filter(Boolean).join(' ')} data-tooltip-root>
      {composedTrigger}

      <Tooltip
        id={mergedId}
        place="bottom"
        isOpen={isOpen}
        clickable
        openOnClick
        closeOnEsc
        className="!rounded-[--radius-lg] !bg-transparent !text-inherit !shadow-none"
        opacity={1}
        afterHide={handleClose}
      >
        <TooltipCard
          {...tooltipContent}
          primaryAction={tooltipContent.primaryAction
            ? {
              ...tooltipContent.primaryAction,
              onClick: () => {
                tooltipContent.primaryAction?.onClick?.();
                handleClose();
              },
            }
            : undefined}
          secondaryAction={tooltipContent.secondaryAction
            ? {
              ...tooltipContent.secondaryAction,
              onClick: () => {
                tooltipContent.secondaryAction?.onClick?.();
                handleClose();
              },
            }
            : undefined}
        />
      </Tooltip>
    </span>
  );
}

