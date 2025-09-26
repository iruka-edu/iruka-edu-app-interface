import * as React from 'react';

export type FieldProps = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: React.ReactElement;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Field({ label, name, hint, error, children, className, ...rest }: FieldProps) {
  const id = React.useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [error ? errorId : undefined, hint ? hintId : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['grid gap-1', className].filter(Boolean).join(' ')} {...rest}>
      <label htmlFor={id} className="text-sm text-[--foreground]">
        {label}
      </label>
      {React.cloneElement(children, {
        id,
        name,
        'aria-describedby': describedBy,
        'aria-invalid': !!error,
      } as Record<string, unknown>)}
      {error && (
        <div id={errorId} className="text-xs text-[--color-danger]">
          {error}
        </div>
      )}
      {hint && !error && (
        <div id={hintId} className="text-xs text-[--muted]">
          {hint}
        </div>
      )}
    </div>
  );
}
