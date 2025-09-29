import React from 'react';
import TitleBar from '../../../docs/adrs/src/components/organisms/TitleBar';

export type PageWithRightRailProps = {
  title?: string;
  sectionText?: string;
  guidebookHref?: string;
  children: React.ReactNode;
};
const PageWithRightRail: React.FC<PageWithRightRailProps> = ({
  title,
  sectionText,
  guidebookHref,
  children,
}) => (
  <div className="min-h-screen">
    <TitleBar showBack={false} sectionText={sectionText} title={title} guidebookHref={guidebookHref} />
    <div className="mx-auto max-w-4xl px-4 py-6">
      {children}
    </div>
  </div>
);
export default PageWithRightRail;
