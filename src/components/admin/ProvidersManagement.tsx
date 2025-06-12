
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminProviders, useUpdateProviderVerification, useUpdateProviderStatus } from '@/hooks/useAdminData';
import AddProviderForm from '@/components/AddProviderForm';
import ProviderSearchControls from './providers/ProviderSearchControls';
import ProvidersList from './providers/ProvidersList';

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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>إدارة مقدمي الخدمات</CardTitle>
          <AddProviderForm />
        </div>
        
        <ProviderSearchControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </CardHeader>
      
      <CardContent>
        <ProvidersList
          providers={providers}
          isLoading={providersLoading}
          onVerificationToggle={handleVerificationToggle}
          onStatusToggle={handleStatusToggle}
          updateVerificationPending={updateVerification.isPending}
          updateStatusPending={updateStatus.isPending}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </CardContent>
    </Card>
  );
};

export default ProvidersManagement;
