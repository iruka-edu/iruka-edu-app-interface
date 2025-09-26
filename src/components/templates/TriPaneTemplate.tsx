'use client';

import * as React from 'react';

export type TriPaneVariant = 'default' | 'compact';

export type TriPaneContextValue = {
  readonly isLeftOpen: boolean;
  readonly isRightOpen: boolean;
  readonly collapsible: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
  setLeftOpen: (next: boolean) => void;
  setRightOpen: (next: boolean) => void;
  readonly leftSlot?: React.ReactNode;
  readonly rightSlot?: React.ReactNode;
};

const TriPaneContext = React.createContext<TriPaneContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useTriPaneContext(): TriPaneContextValue {
  const ctx = React.use(TriPaneContext);
  if (!ctx) {
    throw new Error('useTriPaneContext must be used within a TriPaneTemplate');
  }
  return ctx;
}

export type TriPaneTemplateProps = {
  header?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  mainSlot: React.ReactNode;
  className?: string;
  variant?: TriPaneVariant;
  stickyToolbar?: boolean;
  leftWidth?: number; // px
  rightWidth?: number; // px
  defaultLeftOpen?: boolean;
  defaultRightOpen?: boolean;
  collapsible?: boolean;
  toolbar?: React.ReactNode;
  mainId?: string;
  ariaMainLabel?: string;
};

type TemplateGridConfig = {
  readonly mainPadding: string;
  readonly leftDefault: number; // px
  readonly rightDefault: number; // px
};

const variantConfig: Record<TriPaneVariant, TemplateGridConfig> = {
  default: {
    mainPadding: 'px-4 py-6 lg:px-6',
    leftDefault: 280,
    rightDefault: 320,
  },
  compact: {
    mainPadding: 'px-3 py-4 lg:px-5',
    leftDefault: 240,
    rightDefault: 280,
  },
};

// Build tailwind grid template utility once; widths are driven by CSS vars.
function gridTemplateClass() {
  return 'grid-cols-1 xl:grid-cols-[var(--tri-pane-left)_minmax(0,1fr)_var(--tri-pane-right)]';
}

export default function TriPaneTemplate(props: TriPaneTemplateProps) {
  const {
    header,
    leftSlot,
    rightSlot,
    mainSlot,
    className,
    variant = 'default',
    stickyToolbar = true,
    leftWidth,
    rightWidth,
    defaultLeftOpen = true,
    defaultRightOpen = true,
    collapsible = true,
    toolbar,
    mainId,
    ariaMainLabel,
  } = props;

  const [isLeftOpen, setLeftOpen] = React.useState(defaultLeftOpen);
  const [isRightOpen, setRightOpen] = React.useState(defaultRightOpen);

  const toggleLeft = React.useCallback(() => {
    if (collapsible) {
      setLeftOpen(v => !v);
    }
  }, [collapsible]);

  const toggleRight = React.useCallback(() => {
    if (collapsible) {
      setRightOpen(v => !v);
    }
  }, [collapsible]);

  const ctxValue = React.useMemo<TriPaneContextValue>(
    () => ({
      isLeftOpen,
      isRightOpen,
      collapsible,
      toggleLeft,
      toggleRight,
      setLeftOpen,
      setRightOpen,
      leftSlot,
      rightSlot,
    }),
    [isLeftOpen, isRightOpen, collapsible, toggleLeft, toggleRight, leftSlot, rightSlot],
  );

  // ----- WIDTH CONTROL BY CSS VARS -----
  const { mainPadding, leftDefault, rightDefault } = variantConfig[variant];

  const computedLeft = (leftWidth ?? leftDefault);
  const computedRight = (rightWidth ?? rightDefault);

  const styleVars: React.CSSProperties = {
    // when panel closed -> 0px; otherwise configured width
    // keep columns responsive only at xl via grid template class.
    // (mobile: single column, so these vars don't matter)
    ['--tri-pane-left' as any]: collapsible
      ? (isLeftOpen ? `${computedLeft}px` : '0px')
      : `${computedLeft}px`,
    ['--tri-pane-right' as any]: collapsible
      ? (rightSlot ? (isRightOpen ? `${computedRight}px` : '0px') : '0px')
      : (rightSlot ? `${computedRight}px` : '0px'),
  };

  return (
    <TriPaneContext value={ctxValue}>
      <div
        className={[
          'min-h-dvh bg-[--background] text-[--foreground]',
          'flex flex-col',
          className,
        ].filter(Boolean).join(' ')}
        data-tri-pane
      >
        {header
          ? (
              <header className="border-b border-[--border] bg-[--card]">
                <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-4 lg:px-6">
                  {header}
                </div>
              </header>
            )
          : null}

        <div
          className={[
            'flex-1',
            'xl:grid',
            gridTemplateClass(),
            'gap-0',
            'bg-[#0f1a1f]',
          ].join(' ')}
          style={styleVars}
        >
          {/* LEFT */}
          <aside
            aria-label="Primary"
            data-panel="left"
            className={[
              // mobile ẩn; xl hiện nếu width>0
              'hidden xl:flex xl:flex-col border-r border-[--border] bg-[--card]',
              // không cần width class; width đã do grid column.
            ].join(' ')}
          >
            <div className="flex-1 overflow-y-auto px-4 py-6 xl:px-6">
              {leftSlot}
            </div>
          </aside>

          {/* MAIN */}
          <main
            id={mainId}
            role="main"
            aria-label={ariaMainLabel}
            className={[
              'relative flex min-h-0 flex-col bg-[--background]',
              mainPadding,
            ].join(' ')}
            data-panel="main"
          >
            {toolbar
              ? (
                  <div
                    className={[
                      'flex items-center justify-between gap-2 border-b border-[--border] bg-[--card]/40',
                      stickyToolbar
                        ? 'sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-[--card]/50 -mx-4 px-4 py-3 lg:-mx-6 lg:px-6'
                        : 'mb-4 rounded-[--radius-lg] border px-4 py-3 lg:px-6',
                    ].join(' ')}
                  >
                    {toolbar}
                  </div>
                )
              : null}

            <div className="flex-1 overflow-y-auto pt-4">
              <div className="mx-auto w-full max-w-[1200px] space-y-6">
                {mainSlot}
              </div>
            </div>

            {/* Right slot moves below on mobile */}
            {collapsible && rightSlot
              ? (
                  <section className="mt-6 xl:hidden" aria-label="Supplementary">
                    {rightSlot}
                  </section>
                )
              : null}
          </main>

          {/* RIGHT */}
          {rightSlot
            ? (
                <aside
                  aria-label="Supplementary"
                  data-panel="right"
                  className={[
                    'hidden xl:flex xl:flex-col border-l border-[--border] bg-[--card]',
                  ].join(' ')}
                >
                  <div className="flex-1 overflow-y-auto px-4 py-6 xl:px-6">
                    {rightSlot}
                  </div>
                </aside>
              )
            : null}
        </div>
      </div>
    </TriPaneContext>
  );
}
