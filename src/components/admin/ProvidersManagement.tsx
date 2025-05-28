
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAdminProviders, useUpdateProviderVerification, useUpdateProviderStatus } from '@/hooks/useAdminData';
import AddProviderForm from '@/components/AddProviderForm';
import EditProviderDialog from './EditProviderDialog';
import DeleteProviderDialog from './DeleteProviderDialog';
import { Search, Eye, EyeOff } from 'lucide-react';

const ProvidersManagement = () => {
  const { data: providers, isLoading: providersLoading } = useAdminProviders();
  const updateVerification = useUpdateProviderVerification();
  const updateStatus = useUpdateProviderStatus();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleVerificationToggle = (providerId: string, currentStatus: boolean) => {
    updateVerification.mutate({
      id: providerId,
      isVerified: !currentStatus
    });
  };

  const handleStatusToggle = (providerId: string, currentStatus: boolean) => {
    updateStatus.mutate({
      id: providerId,
      isActive: !currentStatus
    });
  };

  const filteredProviders = providers?.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.phone.includes(searchTerm) ||
                         provider.service_types?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && provider.is_active) ||
                         (statusFilter === 'inactive' && !provider.is_active);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>إدارة مقدمي الخدمات</CardTitle>
          <AddProviderForm />
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث بالاسم، الهاتف، أو نوع الخدمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              الكل
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              نشط
            </Button>
            <Button
              variant={statusFilter === 'inactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('inactive')}
            >
              معطل
            </Button>
          </div>
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
            {filteredProviders?.map((provider) => (
              <div key={provider.id} className="border rounded-lg p-4">
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
                    <p className="text-sm text-gray-500">{provider.phone}</p>
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
                    onClick={() => handleVerificationToggle(provider.id, provider.is_verified)}
                    disabled={updateVerification.isPending}
                  >
                    {provider.is_verified ? "إلغاء التوثيق" : "توثيق"}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant={provider.is_active ? "outline" : "default"}
                    onClick={() => handleStatusToggle(provider.id, provider.is_active)}
                    disabled={updateStatus.isPending}
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
            ))}
            
            {filteredProviders?.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                {searchTerm || statusFilter !== 'all' 
                  ? "لا توجد مقدمي خدمات تطابق البحث" 
                  : "لا توجد مقدمي خدمات حالياً"
                }
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProvidersManagement;
