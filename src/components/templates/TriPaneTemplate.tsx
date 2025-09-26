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

const TriPaneContext = React.createContext<TriPaneContextValue | null>(null);

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
  leftWidth?: number;
  rightWidth?: number;
  defaultLeftOpen?: boolean;
  defaultRightOpen?: boolean;
  collapsible?: boolean;
  toolbar?: React.ReactNode;
  mainId?: string;
  ariaMainLabel?: string;
};

type TemplateGridConfig = {
  readonly left: string;
  readonly right: string;
  readonly mainPadding: string;
};

const variantConfig: Record<TriPaneVariant, TemplateGridConfig> = {
  default: {
    left: 'xl:w-[280px]',
    right: 'xl:w-[320px]',
    mainPadding: 'px-4 py-6 lg:px-6',
  },
  compact: {
    left: 'xl:w-[240px]',
    right: 'xl:w-[280px]',
    mainPadding: 'px-3 py-4 lg:px-5',
  },
};

function buildGridTemplate(leftWidth?: number, rightWidth?: number): string {
  const left = leftWidth ? `${leftWidth}px` : 'var(--tri-pane-left, 280px)';
  const right = rightWidth ? `${rightWidth}px` : 'var(--tri-pane-right, 320px)';
  return `grid-cols-1 xl:grid-cols-[${left}_minmax(0,1fr)_${right}]`;
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

  const [isLeftOpen, setLeftOpen] = React.useState<boolean>(defaultLeftOpen);
  const [isRightOpen, setRightOpen] = React.useState<boolean>(defaultRightOpen);

  const toggleLeft = React.useCallback(() => {
    if (!collapsible) {
      return;
    }
    setLeftOpen(value => !value);
  }, [collapsible]);

  const toggleRight = React.useCallback(() => {
    if (!collapsible) {
      return;
    }
    setRightOpen(value => !value);
  }, [collapsible]);

  const contextValue = React.useMemo<TriPaneContextValue>(() => ({
    isLeftOpen,
    isRightOpen,
    collapsible,
    toggleLeft,
    toggleRight,
    setLeftOpen,
    setRightOpen,
    leftSlot,
    rightSlot,
  }), [collapsible, isLeftOpen, isRightOpen, toggleLeft, toggleRight, leftSlot, rightSlot]);

  const gridTemplate = buildGridTemplate(leftWidth, rightWidth);
  const { left, right, mainPadding } = variantConfig[variant];

  return (
    <TriPaneContext value={contextValue}>
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
            gridTemplate,
            'gap-0',
            'bg-[#0f1a1f]',
          ].join(' ')}
        >
          <aside
            aria-label="Primary"
            data-panel="left"
            className={[
              'hidden border-r border-[--border] bg-[--card] xl:flex xl:flex-col',
              left,
              collapsible ? 'xl:data-[collapsed=false]:flex' : '',
              isLeftOpen ? 'data-[collapsed=false]:block' : 'data-[collapsed=true]:hidden',
            ].filter(Boolean).join(' ')}
            data-collapsed={collapsible ? (!isLeftOpen ? 'true' : 'false') : undefined}
          >
            <div className="flex-1 overflow-y-auto px-4 py-6 xl:px-6">
              {leftSlot}
            </div>
          </aside>

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
                    stickyToolbar ? 'sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-[--card]/50' : 'mb-4 rounded-[--radius-lg] border',
                    stickyToolbar ? '-mx-4 px-4 py-3 lg:-mx-6 lg:px-6' : 'px-4 py-3 lg:px-6',
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

            {collapsible && rightSlot
              ? (
                <section className="mt-6 xl:hidden" aria-label="Supplementary">
                  {rightSlot}
                </section>
              )
              : null}
          </main>

          {rightSlot
            ? (
              <aside
                aria-label="Supplementary"
                data-panel="right"
                className={[
                  'hidden border-l border-[--border] bg-[--card] xl:flex xl:flex-col',
                  right,
                  collapsible ? 'xl:data-[collapsed=false]:flex' : '',
                  isRightOpen ? 'data-[collapsed=false]:block' : 'data-[collapsed=true]:hidden',
                ].filter(Boolean).join(' ')}
                data-collapsed={collapsible ? (!isRightOpen ? 'true' : 'false') : undefined}
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
