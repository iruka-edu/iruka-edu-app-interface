import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type ISectionsProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Sections',
  description: 'Sections page',
};

export default async function Sections(props: ISectionsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Sections</h1>
    </div>
  );
}
