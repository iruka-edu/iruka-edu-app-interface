import React from 'react';
import BasicProgressBar from '../atoms/BasicProgressBar';
import CardSurface from '../atoms/CardSurface';
import Text from '../atoms/Text';

export type RightRailCardVariant = 'promo' | 'unlock' | 'quest';

export type RightRailCardProps = {
  variant?: RightRailCardVariant;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  progress?: number;
};

const RightRailCard: React.FC<RightRailCardProps> = ({ title, description, ctaLabel, onCtaClick, progress }) => (
  <CardSurface className="p-5">
    <Text variant="title" weight="bold">
      {title}
    </Text>
    {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
    {progress !== undefined && (
      <div className="mt-3">
        <BasicProgressBar value={progress} />
      </div>
    )}
    {ctaLabel && (
      <button type="button" className="mt-4 rounded-xl bg-sky-600 px-4 py-2 text-white" onClick={onCtaClick}>
        {ctaLabel}
      </button>
    )}
  </CardSurface>
);

export default RightRailCard;
