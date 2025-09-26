import * as React from 'react';

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement<{ id?: string }>;
};

export default function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {React.cloneElement(children, {
        'id': children.props.id ?? id,
        'aria-describedby': id,
      } as Record<string, unknown>)}
      {open && (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-50 -translate-x-1/2 rounded-[--radius-sm] bg-[--card] px-2 py-1 text-xs whitespace-nowrap text-[--card-foreground] shadow"
        >
          {content}
        </span>
      )}
    </span>
  );
}
