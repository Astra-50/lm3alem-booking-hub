
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProviderCardProps {
  id: string;
  name: string;
  service: string;
  city: string;
  neighborhood: string;
  isVerified: boolean;
  isAvailableToday: boolean;
  image?: string;
}

const ProviderCard = ({ 
  id, 
  name, 
  service, 
  city, 
  neighborhood, 
  isVerified, 
  isAvailableToday,
  image 
}: ProviderCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {name}
              </h3>
              {isVerified && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  ✅ موثّق من معلم
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-1">{service}</p>
            <p className="text-sm text-gray-500 mb-3">{city} - {neighborhood}</p>
            
            {isAvailableToday && (
              <Badge variant="outline" className="text-green-600 border-green-600 mb-3">
                متاح اليوم
              </Badge>
            )}
            
            <Link to={`/provider/${id}`}>
              <Button variant="outline" className="w-full">
                عرض الملف الشخصي
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
