
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const cities = [
  { value: 'casablanca', label: 'الدار البيضاء' },
  { value: 'rabat', label: 'الرباط' },
  { value: 'sale', label: 'سلا' },
  { value: 'fes', label: 'فاس' },
  { value: 'marrakech', label: 'مراكش' }
];

const services = [
  { value: 'cleaning', label: 'تنظيف' },
  { value: 'plumbing', label: 'سباكة' },
  { value: 'electrical', label: 'كهرباء' },
  { value: 'repairs', label: 'إصلاحات' },
  { value: 'painting', label: 'دهان' },
  { value: 'carpentry', label: 'نجارة' }
];

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append('city', selectedCity);
    if (selectedService) params.append('service', selectedService);
    
    navigate(`/providers${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <Layout>
      <Header />
      
      {/* Hero Section */}
      <div className="py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            احجز مقدمي خدمات <span className="text-primary">موثوقين</span> في مدينتك
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            التنظيف، السباكة، التصليحات والمزيد — كل ما تحتاجه من خدمات منزلية بجودة عالية
          </p>
          
          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اختر المدينة
                </label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="اختر مدينتك" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اختر الخدمة
                </label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="نوع الخدمة" />
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
            
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
            >
              اعرض مقدمي الخدمة
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا معلم؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نحن نربطك بأفضل مقدمي الخدمات المحليين الموثوقين في مدينتك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">معلمون موثقون</h3>
            <p className="text-gray-600">جميع مقدمي الخدمات تم التحقق منهم بعناية</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">حجز سريع</h3>
            <p className="text-gray-600">احجز في دقائق وستحصل على رد سريع</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">تواصل مباشر</h3>
            <p className="text-gray-600">تواصل مباشر عبر الهاتف أو واتساب</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
