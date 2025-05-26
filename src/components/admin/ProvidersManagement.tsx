
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminProviders, useUpdateProviderVerification } from '@/hooks/useAdminData';
import AddProviderForm from '@/components/AddProviderForm';

const ProvidersManagement = () => {
  const { data: providers, isLoading: providersLoading } = useAdminProviders();
  const updateVerification = useUpdateProviderVerification();

  const handleVerificationToggle = (providerId: string, currentStatus: boolean) => {
    updateVerification.mutate({
      id: providerId,
      isVerified: !currentStatus
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>إدارة مقدمي الخدمات</CardTitle>
          <AddProviderForm />
        </div>
      </CardHeader>
      <CardContent>
        {providersLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>جاري تحميل مقدمي الخدمات...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {providers?.map((provider) => (
              <div key={provider.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{provider.name}</h3>
                    <p className="text-sm text-gray-600">
                      {provider.service_types?.name} - {provider.cities?.name}
                    </p>
                    {provider.neighborhoods && (
                      <p className="text-sm text-gray-500">
                        {provider.neighborhoods.name}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">{provider.phone}</p>
                  </div>
                  <Badge variant={provider.is_verified ? "default" : "secondary"}>
                    {provider.is_verified ? "موثق" : "غير موثق"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={provider.is_verified ? "secondary" : "default"}
                    onClick={() => handleVerificationToggle(provider.id, provider.is_verified)}
                    disabled={updateVerification.isPending}
                  >
                    {provider.is_verified ? "إلغاء التوثيق" : "توثيق"}
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
                </div>
              </div>
            ))}
            {providers?.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                لا توجد مقدمي خدمات حالياً
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProvidersManagement;
