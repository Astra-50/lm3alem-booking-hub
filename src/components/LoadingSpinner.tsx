
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      <div className={cn(
        "border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-gray-600 text-center font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
