
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import ProviderCard from '@/components/ProviderCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { useProviders } from '@/hooks/useProviders';

const Providers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cityFilter, setCityFilter] = useState(searchParams.get('cityId') || '');
  const [serviceFilter, setServiceFilter] = useState(searchParams.get('serviceTypeId') || '');

  const { data: cities } = useCities();
  const { data: services } = useServiceTypes();
  const { data: providers, isLoading, error } = useProviders({
    cityId: cityFilter || undefined,
    serviceTypeId: serviceFilter || undefined,
  });

  const handleFilterChange = (type: 'cityId' | 'serviceTypeId', value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    
    setSearchParams(params);
    
    if (type === 'cityId') {
      setCityFilter(value);
    } else {
      setServiceFilter(value);
    }
  };

  const clearFilters = () => {
    setCityFilter('');
    setServiceFilter('');
    setSearchParams({});
  };

  if (error) {
    return (
      <Layout>
        <Header />
        <div className="py-8">
          <div className="text-center">
            <p className="text-red-500">حدث خطأ في تحميل البيانات</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      
      <div className="py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">مقدمو الخدمات</h1>
            <p className="text-gray-600">
              {isLoading ? 'جاري البحث...' : `تم العثور على ${providers?.length || 0} مقدم خدمة`}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <Select value={cityFilter} onValueChange={(value) => handleFilterChange('cityId', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="فلترة حسب المدينة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع المدن</SelectItem>
                {cities?.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={serviceFilter} onValueChange={(value) => handleFilterChange('serviceTypeId', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="فلترة حسب الخدمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الخدمات</SelectItem>
                {services?.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : providers && providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                id={provider.id}
                name={provider.name}
                service={provider.service_types?.name || ''}
                city={provider.cities?.name || ''}
                neighborhood={provider.neighborhoods?.name || ''}
                isVerified={provider.is_verified}
                isAvailableToday={true} // We'll calculate this later
                image={provider.profile_image_url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد نتائج مطابقة للبحث</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={clearFilters}
            >
              إزالة الفلاتر
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Providers;
