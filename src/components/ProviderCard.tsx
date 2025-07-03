
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Clock, Star } from 'lucide-react';
import StarRating from './reviews/StarRating';
import ProviderTrustBadges from './trust/ProviderTrustBadges';
import SocialProofIndicators from './trust/SocialProofIndicators';
import { useProviderStats } from '@/hooks/useReviews';

interface ProviderCardProps {
  id: string;
  name: string;
  service: string;
  city: string;
  neighborhood: string;
  isVerified: boolean;
  isAvailableToday: boolean;
  image?: string;
  phone?: string;
  whatsapp?: string;
  languages?: string[];
  experienceDescription?: string;
}

const ProviderCard = ({ 
  id, 
  name, 
  service, 
  city, 
  neighborhood, 
  isVerified, 
  isAvailableToday, 
  image, 
  phone, 
  whatsapp, 
  languages, 
  experienceDescription 
}: ProviderCardProps) => {
  const { data: stats } = useProviderStats(id);
  return (
    <Card className="hover:shadow-xl transition-all duration-300 animate-fade-in border-0 shadow-md hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50/50">
      <CardContent className="p-0">
        {/* Header with image and status badges */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start space-x-4 space-x-reverse">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                {image ? (
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-2xl">
                      {name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Status indicator */}
              {isAvailableToday && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
                    {name}
                  </h3>
                  {/* Rating Display */}
                  {stats?.average_rating && stats.total_reviews > 0 && (
                    <div className="flex items-center mb-2">
                      <StarRating 
                        rating={stats.average_rating} 
                        size="sm" 
                        showNumber={true}
                      />
                      <span className="text-xs text-gray-500 mr-1">
                        ({stats.total_reviews})
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <ProviderTrustBadges 
                      isVerified={isVerified} 
                      stats={stats} 
                      size="sm" 
                    />
                    {isAvailableToday && (
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        متاح اليوم
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-lg font-medium text-primary mb-1">{service}</p>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 ml-1 text-gray-400" />
                <span>{city} - {neighborhood}</span>
              </div>
              
              {/* Social Proof */}
              <SocialProofIndicators stats={stats} size="sm" />
              
              {/* Languages */}
              {languages && languages.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {languages.slice(0, 3).map((language, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {language}
                    </Badge>
                  ))}
                  {languages.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                      +{languages.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Experience preview */}
        {experienceDescription && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {experienceDescription.length > 120 
                ? `${experienceDescription.substring(0, 120)}...` 
                : experienceDescription
              }
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="px-6 pb-6 space-y-3">
          <Link to={`/provider/${id}`} className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
              عرض الملف الشخصي والحجز
            </Button>
          </Link>
          
          {/* Quick contact buttons */}
          <div className="flex space-x-2 space-x-reverse">
            {phone && (
              <a href={`tel:${phone}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Phone className="w-3 h-3 mr-1" />
                  اتصال
                </Button>
              </a>
            )}
            {whatsapp && (
              <a 
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full text-xs text-green-600 border-green-600 hover:bg-green-50">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  واتساب
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
