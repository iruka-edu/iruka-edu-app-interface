import type { LeftNavProps } from '@/components/organisms/LeftNav';
import { setRequestLocale } from 'next-intl/server';
import AppShellGrid from '@/components/templates/AppShellGrid';

const navItems: LeftNavProps['items'] = [
  { icon: 'learn', label: 'Học', href: '/', active: true },
  { icon: 'profile', label: 'Hồ sơ', href: '/profile' },
];

export default async function ShellLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return (
    <AppShellGrid navItems={navItems}>
      {props.children}
    </AppShellGrid>
  );
}
