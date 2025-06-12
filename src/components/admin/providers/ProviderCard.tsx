
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EditProviderDialog from '../EditProviderDialog';
import DeleteProviderDialog from '../DeleteProviderDialog';
import PhoneDisplay from '@/components/PhoneDisplay';
import { Eye, EyeOff } from 'lucide-react';

interface ProviderCardProps {
  provider: any;
  onVerificationToggle: (providerId: string, currentStatus: boolean) => void;
  onStatusToggle: (providerId: string, currentStatus: boolean) => void;
  updateVerificationPending: boolean;
  updateStatusPending: boolean;
}

const ProviderCard = ({ 
  provider, 
  onVerificationToggle, 
  onStatusToggle, 
  updateVerificationPending, 
  updateStatusPending 
}: ProviderCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{provider.name}</h3>
            <div className="flex gap-2">
              <Badge variant={provider.is_verified ? "default" : "secondary"}>
                {provider.is_verified ? "موثق" : "غير موثق"}
              </Badge>
              <Badge variant={provider.is_active ? "default" : "destructive"}>
                {provider.is_active ? "نشط" : "معطل"}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {provider.service_types?.name} - {provider.cities?.name}
          </p>
          {provider.neighborhoods && (
            <p className="text-sm text-gray-500">
              {provider.neighborhoods.name}
            </p>
          )}
          <div className="text-sm text-gray-500">
            <PhoneDisplay phone={provider.phone} className="text-sm" />
          </div>
        </div>
        
        {provider.profile_image_url && (
          <img 
            src={provider.profile_image_url}
            alt={provider.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <EditProviderDialog provider={provider} />
        
        <Button 
          size="sm" 
          variant={provider.is_verified ? "secondary" : "default"}
          onClick={() => onVerificationToggle(provider.id, provider.is_verified)}
          disabled={updateVerificationPending}
        >
          {provider.is_verified ? "إلغاء التوثيق" : "توثيق"}
        </Button>
        
        <Button 
          size="sm" 
          variant={provider.is_active ? "outline" : "default"}
          onClick={() => onStatusToggle(provider.id, provider.is_active)}
          disabled={updateStatusPending}
        >
          {provider.is_active ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              إيقاف
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              تفعيل
            </>
          )}
        </Button>
        
        <a href={`tel:${provider.phone}`}>
          <Button size="sm" variant="outline">
            اتصال
          </Button>
        </a>
        
        {provider.whatsapp && (
          <a 
            href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="outline">
              واتساب
            </Button>
          </a>
        )}
        
        <DeleteProviderDialog provider={provider} />
      </div>
    </div>
  );
};

export default ProviderCard;
