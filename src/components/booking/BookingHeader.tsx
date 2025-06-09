
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface BookingHeaderProps {
  providerName: string;
}

const BookingHeader = ({ providerName }: BookingHeaderProps) => {
  return (
    <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        احجز الخدمة
      </CardTitle>
      <p className="text-gray-600 text-lg mt-2">
        أكمل النموذج وسيتواصل معك {providerName} قريباً
      </p>
    </CardHeader>
  );
};

export default BookingHeader;
