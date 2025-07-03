import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({ 
  rating, 
  size = 'md', 
  showNumber = true, 
  interactive = false,
  onRatingChange 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          disabled={!interactive}
          onClick={() => handleStarClick(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <svg
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      ))}
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-gray-600 mr-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;