
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import PhoneDisplay from '@/components/PhoneDisplay';

interface ProviderContactCardProps {
  phone: string;
  whatsapp?: string;
}

const ProviderContactCard = ({ phone, whatsapp }: ProviderContactCardProps) => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-base md:text-lg">
          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
          <span>معلومات التواصل</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-3 px-4 md:px-6 pb-4 md:pb-6">
        <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse min-w-0 flex-1">
            <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <PhoneDisplay phone={phone} />
            </div>
          </div>
          <a href={`tel:${phone}`} className="flex-shrink-0 mr-2">
            <Button size="sm" variant="outline" className="text-xs md:text-sm h-8 md:h-9 px-2 md:px-3">
              اتصال
            </Button>
          </a>
        </div>
        
        {whatsapp && (
          <div className="flex items-center justify-between p-2 md:p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse min-w-0 flex-1">
              <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <PhoneDisplay phone={whatsapp} />
              </div>
            </div>
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mr-2"
            >
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm h-8 md:h-9 px-2 md:px-3">
                واتساب
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderContactCard;
