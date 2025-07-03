import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ProviderStats } from '@/hooks/useReviews';

interface ProviderTrustBadgesProps {
  isVerified: boolean;
  stats?: ProviderStats | null;
  size?: 'sm' | 'md';
}

const ProviderTrustBadges = ({ isVerified, stats, size = 'sm' }: ProviderTrustBadgesProps) => {
  const badgeSize = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';

  const getBadges = () => {
    const badges = [];

    // Verification badge
    if (isVerified) {
      badges.push(
        <Badge 
          key="verified" 
          className={`bg-green-50 text-green-700 border-green-200 ${badgeSize}`}
        >
          ✓ موثق من معلم
        </Badge>
      );
    }

    // Experience badges based on completed bookings
    if (stats?.completed_bookings) {
      if (stats.completed_bookings >= 100) {
        badges.push(
          <Badge 
            key="expert" 
            className={`bg-purple-50 text-purple-700 border-purple-200 ${badgeSize}`}
          >
            🏆 خبير معتمد
          </Badge>
        );
      } else if (stats.completed_bookings >= 50) {
        badges.push(
          <Badge 
            key="experienced" 
            className={`bg-blue-50 text-blue-700 border-blue-200 ${badgeSize}`}
          >
            ⭐ ذو خبرة
          </Badge>
        );
      } else if (stats.completed_bookings >= 10) {
        badges.push(
          <Badge 
            key="reliable" 
            className={`bg-orange-50 text-orange-700 border-orange-200 ${badgeSize}`}
          >
            👍 موثوق
          </Badge>
        );
      }
    }

    // High rating badge
    if (stats?.average_rating && stats.average_rating >= 4.5 && stats.total_reviews >= 5) {
      badges.push(
        <Badge 
          key="top-rated" 
          className={`bg-yellow-50 text-yellow-700 border-yellow-200 ${badgeSize}`}
        >
          ⭐ أعلى التقييمات
        </Badge>
      );
    }

    // Recent activity badge
    if (stats?.last_booking_at) {
      const lastBooking = new Date(stats.last_booking_at);
      const daysSinceLastBooking = Math.floor((Date.now() - lastBooking.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastBooking <= 7) {
        badges.push(
          <Badge 
            key="active" 
            className={`bg-green-50 text-green-700 border-green-200 ${badgeSize}`}
          >
            🔥 نشط مؤخراً
          </Badge>
        );
      }
    }

    return badges;
  };

  const badges = getBadges();

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges}
    </div>
  );
};

export default ProviderTrustBadges;