
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import ProviderCard from '@/components/ProviderCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - in real app this would come from Supabase
const mockProviders = [
  {
    id: '1',
    name: 'أحمد الصالحي',
    service: 'تنظيف',
    city: 'الرباط',
    neighborhood: 'أكدال',
    isVerified: true,
    isAvailableToday: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'محمد بن علي',
    service: 'سباكة',
    city: 'الدار البيضاء',
    neighborhood: 'المعاريف',
    isVerified: true,
    isAvailableToday: false,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'فاطمة الزهراء',
    service: 'تنظيف',
    city: 'سلا',
    neighborhood: 'بطانة',
    isVerified: true,
    isAvailableToday: true,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'يوسف الكريمي',
    service: 'كهرباء',
    city: 'الرباط',
    neighborhood: 'حسان',
    isVerified: false,
    isAvailableToday: true
  }
];

const cities = [
  { value: '', label: 'جميع المدن' },
  { value: 'casablanca', label: 'الدار البيضاء' },
  { value: 'rabat', label: 'الرباط' },
  { value: 'sale', label: 'سلا' }
];

const services = [
  { value: '', label: 'جميع الخدمات' },
  { value: 'cleaning', label: 'تنظيف' },
  { value: 'plumbing', label: 'سباكة' },
  { value: 'electrical', label: 'كهرباء' },
  { value: 'repairs', label: 'إصلاحات' }
];

const Providers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || '');
  const [serviceFilter, setServiceFilter] = useState(searchParams.get('service') || '');

  useEffect(() => {
    let filtered = mockProviders;
    
    if (cityFilter) {
      filtered = filtered.filter(provider => 
        provider.city.includes(getCityNameByValue(cityFilter))
      );
    }
    
    if (serviceFilter) {
      filtered = filtered.filter(provider => 
        provider.service.includes(getServiceNameByValue(serviceFilter))
      );
    }
    
    setFilteredProviders(filtered);
  }, [cityFilter, serviceFilter]);

  const getCityNameByValue = (value: string) => {
    const city = cities.find(c => c.value === value);
    return city ? city.label : '';
  };

  const getServiceNameByValue = (value: string) => {
    const service = services.find(s => s.value === value);
    return service ? service.label : '';
  };

  const handleFilterChange = (type: 'city' | 'service', value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    
    setSearchParams(params);
    
    if (type === 'city') {
      setCityFilter(value);
    } else {
      setServiceFilter(value);
    }
  };

  return (
    <Layout>
      <Header />
      
      <div className="py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">مقدمو الخدمات</h1>
            <p className="text-gray-600">
              تم العثور على {filteredProviders.length} مقدم خدمة
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <Select value={cityFilter} onValueChange={(value) => handleFilterChange('city', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="فلترة حسب المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={serviceFilter} onValueChange={(value) => handleFilterChange('service', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="فلترة حسب الخدمة" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                id={provider.id}
                name={provider.name}
                service={provider.service}
                city={provider.city}
                neighborhood={provider.neighborhood}
                isVerified={provider.isVerified}
                isAvailableToday={provider.isAvailableToday}
                image={provider.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد نتائج مطابقة للبحث</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setCityFilter('');
                setServiceFilter('');
                setSearchParams({});
              }}
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
