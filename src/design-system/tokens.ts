export type ColorToken
  = | 'primary'
    | 'primaryForeground'
    | 'secondary'
    | 'secondaryForeground'
    | 'accent'
    | 'danger'
    | 'warning'
    | 'muted'
    | 'correct'
    | 'incorrect'
    | 'background'
    | 'foreground'
    | 'card'
    | 'cardForeground'
    | 'popover'
    | 'popoverForeground'
    | 'border'
    | 'ring';

export type RadiusToken = 'sm' | 'md' | 'lg';

export const cssVar = (name: string) => `var(${name})` as const;

export const colors: Record<ColorToken, string> = {
  primary: cssVar('--color-primary'),
  primaryForeground: cssVar('--color-primary-foreground'),
  secondary: cssVar('--color-secondary'),
  secondaryForeground: cssVar('--color-secondary-foreground'),
  accent: cssVar('--color-accent'),
  danger: cssVar('--color-danger'),
  warning: cssVar('--color-warning'),
  muted: cssVar('--color-muted'),
  correct: cssVar('--color-correct'),
  incorrect: cssVar('--color-incorrect'),
  background: cssVar('--background'),
  foreground: cssVar('--foreground'),
  card: cssVar('--card'),
  cardForeground: cssVar('--card-foreground'),
  popover: cssVar('--popover'),
  popoverForeground: cssVar('--popover-foreground'),
  border: cssVar('--border'),
  ring: cssVar('--ring'),
};

export const radius: Record<RadiusToken, string> = {
  sm: cssVar('--radius-sm'),
  md: cssVar('--radius-md'),
  lg: cssVar('--radius-lg'),
};

export const fonts = {
  sans: cssVar('--font-sans'),
  mono: cssVar('--font-mono'),
};

export const typography = {
  xs: cssVar('--text-xs'),
  sm: cssVar('--text-sm'),
  base: cssVar('--text-base'),
  lg: cssVar('--text-lg'),
  xl: cssVar('--text-xl'),
  x2l: cssVar('--text-2xl'),
};

export type DesignTokens = {
  colors: typeof colors;
  radius: typeof radius;
  fonts: typeof fonts;
  typography: typeof typography;
};

export const tokens: DesignTokens = {
  colors,
  radius,
  fonts,
  typography,
};
