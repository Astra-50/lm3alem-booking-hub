
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { CheckCircle, Clock, Star, Zap } from 'lucide-react';

const HeroSection = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { data: services, isLoading: servicesLoading } = useServiceTypes();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append('cityId', selectedCity);
    if (selectedService) params.append('serviceTypeId', selectedService);
    
    navigate(`/providers${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Trust badge */}
        <div className="mb-8">
          <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg">
            <CheckCircle className="w-5 h-5 mr-2" />
            أكثر من 2000 عميل يثق بنا يومياً
          </Badge>
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            معلمك المثالي
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            على بُعد نقرة
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          احجز أفضل مقدمي الخدمات المنزلية في المغرب.
          <br />
          <span className="text-blue-600 font-semibold">موثوقون، سريعون، ومحترفون</span>
        </p>
        
        {/* Enhanced search form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 max-w-4xl mx-auto mb-12 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700 text-right">
                🏙️ اختر مدينتك
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={citiesLoading}>
                <SelectTrigger className="w-full text-right h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                  <SelectValue placeholder={citiesLoading ? "جاري التحميل..." : "اختر مدينتك"} />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.id} className="text-lg py-3">
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700 text-right">
                🔧 نوع الخدمة
              </label>
              <Select value={selectedService} onValueChange={setSelectedService} disabled={servicesLoading}>
                <SelectTrigger className="w-full text-right h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                  <SelectValue placeholder={servicesLoading ? "جاري التحميل..." : "نوع الخدمة"} />
                </SelectTrigger>
                <SelectContent>
                  {services?.map((service) => (
                    <SelectItem key={service.id} value={service.id} className="text-lg py-3">
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            size="lg" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl py-6 h-16 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
            disabled={citiesLoading || servicesLoading}
          >
            <Zap className="w-6 h-6 mr-3" />
            ابحث عن معلم الآن
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
          <div className="flex items-center space-x-2 space-x-reverse">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <span className="text-lg font-medium">معلمون مُتحققون</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Clock className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-medium">استجابة فورية</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Star className="w-6 h-6 text-amber-500 fill-current" />
            <span className="text-lg font-medium">تقييمات ممتازة</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
