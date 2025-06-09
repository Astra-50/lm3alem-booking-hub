
import React from 'react';
import { phoneNumberClasses, formatPhoneNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PhoneDisplayProps {
  phone: string;
  className?: string;
}

const PhoneDisplay = ({ phone, className }: PhoneDisplayProps) => {
  return (
    <span className={cn(phoneNumberClasses, "text-left", className)} dir="ltr">
      {formatPhoneNumber(phone)}
    </span>
  );
};

export default PhoneDisplay;
