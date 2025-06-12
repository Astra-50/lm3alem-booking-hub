
import React from 'react';
import ProviderCard from './ProviderCard';

interface ProvidersListProps {
  providers: any[] | undefined;
  isLoading: boolean;
  onVerificationToggle: (providerId: string, currentStatus: boolean) => void;
  onStatusToggle: (providerId: string, currentStatus: boolean) => void;
  updateVerificationPending: boolean;
  updateStatusPending: boolean;
  searchTerm: string;
  statusFilter: 'all' | 'active' | 'inactive';
}

const ProvidersList = ({ 
  providers, 
  isLoading, 
  onVerificationToggle, 
  onStatusToggle, 
  updateVerificationPending, 
  updateStatusPending,
  searchTerm,
  statusFilter
}: ProvidersListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p>جاري تحميل مقدمي الخدمات...</p>
      </div>
    );
  }

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
    <div className="space-y-4">
      {filteredProviders?.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          onVerificationToggle={onVerificationToggle}
          onStatusToggle={onStatusToggle}
          updateVerificationPending={updateVerificationPending}
          updateStatusPending={updateStatusPending}
        />
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
  );
};

export default ProvidersList;
