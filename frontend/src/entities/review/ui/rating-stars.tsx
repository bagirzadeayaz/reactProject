import { useTranslation } from 'react-i18next';
import { cn } from '../../../shared/lib/cn';
import { Icon } from '../../../shared/ui';

export interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
}

export const RatingStars = ({ rating, max = 5, className }: RatingStarsProps) => {
  const { t } = useTranslation('product');

  return (
    <div
      role="img"
      aria-label={t('ratingOf', { rating })}
      className={cn('rating-stars flex gap-1', className)}
    >
      {Array.from({ length: max }, (_, index) => (
        <Icon
          key={index}
          name="star"
          className={cn('size-4', index < rating ? 'fill-current' : 'opacity-40')}
        />
      ))}
    </div>
  );
};
