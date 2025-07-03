import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReviewCard from './ReviewCard';
import ReviewDialog from './ReviewDialog';
import StarRating from './StarRating';
import { useProviderReviews, useProviderStats } from '@/hooks/useReviews';

interface ProviderReviewsSectionProps {
  providerId: string;
  providerName: string;
}

const ProviderReviewsSection = ({ providerId, providerName }: ProviderReviewsSectionProps) => {
  const { data: reviews, isLoading: reviewsLoading } = useProviderReviews(providerId);
  const { data: stats } = useProviderStats(providerId);

  if (reviewsLoading) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4 px-4 md:px-6 pt-4 md:pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base md:text-lg">
              التقييمات والآراء
            </CardTitle>
            {stats && (
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <StarRating 
                    rating={stats.average_rating} 
                    size="sm" 
                    showNumber={true}
                  />
                  <span>({stats.total_reviews} تقييم)</span>
                </div>
              </div>
            )}
          </div>
          <ReviewDialog 
            providerId={providerId} 
            providerName={providerName}
          />
        </div>
      </CardHeader>
      
      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
        {reviews && reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.slice(0, 5).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {reviews.length > 5 && (
              <p className="text-sm text-gray-500 text-center pt-2">
                وعرض {reviews.length - 5} تقييم إضافي...
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">لا توجد تقييمات بعد</p>
            <ReviewDialog 
              providerId={providerId} 
              providerName={providerName}
              trigger={
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  كن أول من يقيم هذا المعلم
                </button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderReviewsSection;