import * as React from 'react';
import AppShell from './AppShell';

export default function ShopTemplate({ children }: { children: React.ReactNode }) {
  return <AppShell header={<span className="font-semibold">Shop</span>}>{children}</AppShell>;
}
