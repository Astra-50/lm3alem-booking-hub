
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProviderBookingCTAProps {
  providerId: string;
  providerName: string;
}

const ProviderBookingCTA = ({ providerId, providerName }: ProviderBookingCTAProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 md:p-8 text-center border-t">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 lg:mb-4 text-gray-900">جاهز للحجز؟</h3>
      <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base lg:text-lg px-2">
        احجز الآن واحصل على خدمة عالية الجودة من {providerName}
      </p>
      <Link to={`/booking/${providerId}`}>
        <Button size="lg" className="bg-primary hover:bg-primary/90 px-6 md:px-8 py-3 md:py-3 text-sm md:text-base lg:text-lg w-full md:w-auto min-h-[44px]">
          احجز الآن
        </Button>
      </Link>
    </div>
  );
};

export default ProviderBookingCTA;
