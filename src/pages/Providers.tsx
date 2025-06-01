
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProviderCard from '@/components/ProviderCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { useProviders } from '@/hooks/useProviders';

const Providers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cityFilter, setCityFilter] = useState(searchParams.get('cityId') || 'all-cities');
  const [serviceFilter, setServiceFilter] = useState(searchParams.get('serviceTypeId') || 'all-services');

  const { data: cities } = useCities();
  const { data: services } = useServiceTypes();
  const { data: providers, isLoading, error } = useProviders({
    cityId: cityFilter !== 'all-cities' ? cityFilter : undefined,
    serviceTypeId: serviceFilter !== 'all-services' ? serviceFilter : undefined,
  });

  const handleFilterChange = (type: 'cityId' | 'serviceTypeId', value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value && value !== 'all-cities' && value !== 'all-services') {
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
    setCityFilter('all-cities');
    setServiceFilter('all-services');
    setSearchParams({});
  };

  if (error) {
    return (
      <Layout>
        <div className="py-16">
          <div className="text-center">
            <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="text-red-600 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">حدث خطأ في تحميل البيانات</h3>
              <p className="text-red-600 mb-6">نعتذر، لم نتمكن من تحميل قائمة مقدمي الخدمات</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                إعادة المحاولة
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            مقدمو الخدمات
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل المعلمين المعتمدين في مدينتك
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">البحث والفلترة</h2>
              <p className="text-gray-600">
                {isLoading ? 'جاري البحث...' : `تم العثور على ${providers?.length || 0} مقدم خدمة`}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select value={cityFilter} onValueChange={(value) => handleFilterChange('cityId', value)}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="فلترة حسب المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-cities">جميع المدن</SelectItem>
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={serviceFilter} onValueChange={(value) => handleFilterChange('serviceTypeId', value)}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="فلترة حسب الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-services">جميع الخدمات</SelectItem>
                  {services?.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(cityFilter !== 'all-cities' || serviceFilter !== 'all-services') && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-gray-300 hover:border-blue-400 hover:text-blue-600"
                >
                  مسح الفلاتر
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : providers && providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <div key={provider.id} className="transform hover:scale-105 transition-all duration-300">
                <ProviderCard
                  id={provider.id}
                  name={provider.name}
                  service={provider.service_types?.name || ''}
                  city={provider.cities?.name || ''}
                  neighborhood={provider.neighborhoods?.name || ''}
                  isVerified={provider.is_verified}
                  isAvailableToday={true}
                  image={provider.profile_image_url}
                  phone={provider.phone}
                  whatsapp={provider.whatsapp}
                  languages={provider.languages}
                  experienceDescription={provider.experience_description}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">لا توجد نتائج</h3>
              <p className="text-gray-600 text-lg mb-8">
                لم نتمكن من العثور على مقدمي خدمات مطابقين لبحثك
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                إزالة جميع الفلاتر
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Providers;
