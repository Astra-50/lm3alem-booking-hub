import React from 'react';
import { ProviderStats } from '@/hooks/useReviews';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface SocialProofIndicatorsProps {
  stats?: ProviderStats | null;
  size?: 'sm' | 'md';
}

const SocialProofIndicators = ({ stats, size = 'sm' }: SocialProofIndicatorsProps) => {
  if (!stats) return null;

  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  const getLastBookingText = () => {
    if (!stats.last_booking_at) return null;
    
    const lastBooking = new Date(stats.last_booking_at);
    const timeAgo = formatDistanceToNow(lastBooking, { 
      addSuffix: true, 
      locale: ar 
    });
    
    return `آخر حجز ${timeAgo}`;
  };

  const indicators = [];

  // Total bookings indicator
  if (stats.completed_bookings > 0) {
    indicators.push(
      <div key="bookings" className={`flex items-center gap-1 text-gray-600 ${textSize}`}>
        <svg className={`${iconSize} text-primary`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>{stats.completed_bookings} عملية حجز ناجحة</span>
      </div>
    );
  }

  // Recent activity indicator
  const lastBookingText = getLastBookingText();
  if (lastBookingText) {
    const daysSinceLastBooking = Math.floor((Date.now() - new Date(stats.last_booking_at!).getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastBooking <= 7) {
      indicators.push(
        <div key="recent" className={`flex items-center gap-1 text-green-600 ${textSize}`}>
          <div className={`${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} bg-green-400 rounded-full animate-pulse`}></div>
          <span>{lastBookingText}</span>
        </div>
      );
    }
  }

  // Trust indicator for high-rated providers
  if (stats.average_rating >= 4.5 && stats.total_reviews >= 3) {
    indicators.push(
      <div key="trusted" className={`flex items-center gap-1 text-yellow-600 ${textSize}`}>
        <svg className={`${iconSize}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span>موثوق من {stats.total_reviews} عميل</span>
      </div>
    );
  }

  if (indicators.length === 0) return null;

  return (
    <div className="space-y-1">
      {indicators}
    </div>
  );
};

export default SocialProofIndicators;