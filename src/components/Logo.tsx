
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'monochrome' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo = ({ className, variant = 'default', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const getColors = () => {
    switch (variant) {
      case 'monochrome':
        return {
          primary: 'currentColor',
          accent: 'currentColor',
          bg: 'transparent'
        };
      case 'minimal':
        return {
          primary: '#1098F7',
          accent: '#1098F7',
          bg: 'transparent'
        };
      default:
        return {
          primary: '#1098F7',
          accent: '#FFD700',
          bg: 'rgba(16, 152, 247, 0.05)'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={cn("inline-flex items-center space-x-3 space-x-reverse", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg hover:drop-shadow-xl transition-all duration-500 group"
        >
          {/* Background circle with subtle gradient */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill={colors.bg}
            stroke={colors.primary}
            strokeWidth="2"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Sacred geometric foundation - Golden ratio inspired */}
          <path
            d="M18 20 L46 20 Q50 20 50 24 L50 36 Q50 40 46 40 L32 40 L32 48 Q32 52 28 52 L24 52 Q20 52 20 48 L20 28 Q20 24 24 24 L28 24 Q32 24 32 28 L32 32"
            fill={colors.primary}
            className="group-hover:fill-opacity-90 transition-all duration-300"
          />
          
          {/* Hidden arrow/growth symbol - the "gasp" moment */}
          <path
            d="M35 28 L42 28 L38.5 24 M35 32 L42 32 L38.5 36"
            stroke={colors.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Cosmic dot - the soul of the brand */}
          <circle
            cx="26"
            cy="30"
            r="2"
            fill={colors.accent}
            className="group-hover:r-3 transition-all duration-300"
          />
        </svg>
        
        {/* Ethereal glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          لمعلم
        </span>
        {size !== 'sm' && (
          <span className="text-xs text-gray-500 font-medium tracking-wide">
            خدمات موثوقة
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
