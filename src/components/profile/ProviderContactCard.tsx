
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
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span>معلومات التواصل</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Phone className="w-4 h-4 text-gray-500" />
            <PhoneDisplay phone={phone} />
          </div>
          <a href={`tel:${phone}`}>
            <Button size="sm" variant="outline" className="text-xs md:text-sm">
              اتصال
            </Button>
          </a>
        </div>
        
        {whatsapp && (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3 space-x-reverse">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <PhoneDisplay phone={whatsapp} />
            </div>
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm">
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
