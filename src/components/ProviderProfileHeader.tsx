
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
    <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 p-8 border-b">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            {provider.profile_image_url ? (
              <img 
                src={provider.profile_image_url} 
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-primary font-bold text-5xl">
                  {provider.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* Verified badge */}
          {provider.is_verified && (
            <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full p-1 shadow-lg">
              <Star className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3 space-x-reverse">
              <h1 className="text-4xl font-bold text-gray-900">
                {provider.name}
              </h1>
              {provider.is_verified && (
                <Badge className="bg-accent text-accent-foreground">
                  ✅ موثّق من معلم
                </Badge>
              )}
            </div>
            
            <p className="text-2xl text-primary font-semibold">
              {provider.service_types?.name}
            </p>
            
            <div className="flex items-center text-gray-600 space-x-2 space-x-reverse">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-lg">
                {provider.cities?.name}{provider.neighborhoods?.name && ` - ${provider.neighborhoods.name}`}
              </span>
            </div>
            
            {/* Quick contact buttons */}
            <div className="flex space-x-3 space-x-reverse pt-4">
              <Link to={`/booking/${provider.id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  احجز هذا المعلم
                </Button>
              </Link>
              
              <a href={`tel:${provider.phone}`}>
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <PhoneDisplay phone={provider.phone} />
                </Button>
              </a>
              
              {provider.whatsapp && (
                <a
                  href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
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
