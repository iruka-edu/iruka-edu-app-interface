// Rules applied: brace-style:1tbs, ts:consistent-type-definitions:type, antfu/no-top-level-await:off
'use client';

import type { TooltipCardProps } from '@molecules/TooltipCard';
import TooltipCard from '@molecules/TooltipCard';
import * as React from 'react';
import { Tooltip } from 'react-tooltip';

type TriggerRenderProps = React.HTMLAttributes<HTMLElement> & {
  readonly 'className'?: string;
  'data-tooltip-id': string;
  'data-tooltip-content': string;
  'data-tooltip-place': 'bottom' | 'top' | 'left' | 'right';
};

export type LearnTooltipProps = {
  readonly id: string;
  /**
   * Render-prop trigger. You MUST spread the provided props onto your trigger element.
   * Example:
   *   <LearnTooltip ...>
   *     {(props) => <button {...props}>Open</button>}
   *   </LearnTooltip>
   */
  readonly children: (props: TriggerRenderProps) => React.ReactElement;
  readonly tooltipContent: TooltipCardProps;
  readonly hoverMode?: 'auto-close' | 'toggle';
  readonly className?: string;
};

export default function LearnTooltip({
  id,
  children,
  tooltipContent,
  hoverMode = 'auto-close',
  className,
}: LearnTooltipProps) {
  const tooltipId = React.useId();
  const mergedId = `${id}-${tooltipId}`;

  const rootRef = React.useRef<HTMLSpanElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleHover = React.useCallback(() => {
    setIsOpen(value => (hoverMode === 'toggle' ? !value : true));
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
      return;
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

  const trigger = children({
    'data-tooltip-id': mergedId,
    'data-tooltip-content': '',
    'data-tooltip-place': 'bottom',
    'onClick': (e) => {
      handleClick();
      // allow user handler to run too if they attach via spread
      (e.currentTarget as any)?.onClick?.(e);
    },
    'onMouseEnter': (e) => {
      handleHover();
      (e.currentTarget as any)?.onMouseEnter?.(e);
    },
    'onMouseLeave': (e) => {
      handleMouseLeave();
      (e.currentTarget as any)?.onMouseLeave?.(e);
    },
    'onFocus': (e) => {
      setIsOpen(true);
      (e.currentTarget as any)?.onFocus?.(e);
    },
    'onBlur': (e) => {
      handleClose();
      (e.currentTarget as any)?.onBlur?.(e);
    },
  } as TriggerRenderProps);

  return (
    <span
      ref={rootRef}
      className={['inline-flex items-center', className].filter(Boolean).join(' ')}
      data-tooltip-root
    >
      {trigger}

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
          primaryAction={
            tooltipContent.primaryAction
              ? {
                  ...tooltipContent.primaryAction,
                  onClick: () => {
                    tooltipContent.primaryAction?.onClick?.();
                    handleClose();
                  },
                }
              : undefined
          }
          secondaryAction={
            tooltipContent.secondaryAction
              ? {
                  ...tooltipContent.secondaryAction,
                  onClick: () => {
                    tooltipContent.secondaryAction?.onClick?.();
                    handleClose();
                  },
                }
              : undefined
          }
        />
      </Tooltip>
    </span>
  );
}
