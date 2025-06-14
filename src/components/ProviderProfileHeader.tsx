
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import PhoneDisplay from '@/components/PhoneDisplay';

interface ProviderProfileHeaderProps {
  provider: {
    id: string;
    name: string;
    service_types?: { name: string };
    cities?: { name: string };
    neighborhoods?: { name: string };
    is_verified: boolean;
    profile_image_url?: string;
    phone: string;
    whatsapp?: string;
  };
}

const ProviderProfileHeader = ({ provider }: ProviderProfileHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 p-4 md:p-8 border-b">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-200 rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 md:border-4 border-white">
            {provider.profile_image_url ? (
              <img 
                src={provider.profile_image_url} 
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-primary font-bold text-2xl md:text-5xl">
                  {provider.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* Verified badge */}
          {provider.is_verified && (
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-accent text-white rounded-full p-1 shadow-lg">
              <Star className="w-3 h-3 md:w-5 md:h-5 fill-current" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-right">
          <div className="flex flex-col space-y-2 md:space-y-3">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3 md:space-x-reverse">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {provider.name}
              </h1>
              {provider.is_verified && (
                <Badge className="bg-accent text-accent-foreground text-xs md:text-sm">
                  ✅ موثّق من معلم
                </Badge>
              )}
            </div>
            
            <p className="text-lg md:text-2xl text-primary font-semibold">
              {provider.service_types?.name}
            </p>
            
            <div className="flex items-center justify-center md:justify-start text-gray-600 space-x-2 space-x-reverse">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <span className="text-sm md:text-lg">
                {provider.cities?.name}{provider.neighborhoods?.name && ` - ${provider.neighborhoods.name}`}
              </span>
            </div>
            
            {/* Quick contact buttons */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 md:space-x-reverse pt-3 md:pt-4 w-full md:w-auto">
              <Link to={`/booking/${provider.id}`} className="w-full md:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto text-sm md:text-base">
                  احجز هذا المعلم
                </Button>
              </Link>
              
              <a href={`tel:${provider.phone}`} className="w-full md:w-auto">
                <Button variant="outline" size="lg" className="flex items-center justify-center gap-2 w-full md:w-auto text-sm md:text-base">
                  <Phone className="w-4 h-4" />
                  <PhoneDisplay phone={provider.phone} />
                </Button>
              </a>
              
              {provider.whatsapp && (
                <a
                  href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto"
                >
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 w-full md:w-auto text-sm md:text-base">
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfileHeader;
