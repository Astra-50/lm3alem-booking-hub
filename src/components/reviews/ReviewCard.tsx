import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { Review } from '@/hooks/useReviews';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(review.created_at), { 
    addSuffix: true, 
    locale: ar 
  });

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{review.customer_name}</h4>
            {review.is_verified && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                ✓ موثق
              </Badge>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRating rating={review.rating} size="sm" showNumber={false} />
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>
        </div>
        
        {review.review_text && (
          <p className="text-gray-700 text-sm leading-relaxed">
            {review.review_text}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;