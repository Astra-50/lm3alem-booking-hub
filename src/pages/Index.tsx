
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { Star, Users, CheckCircle, Clock, Phone, MessageCircle } from 'lucide-react';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const navigate = useNavigate();
  
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { data: services, isLoading: servicesLoading } = useServiceTypes();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append('cityId', selectedCity);
    if (selectedService) params.append('serviceTypeId', selectedService);
    
    navigate(`/providers${params.toString() ? `?${params.toString()}` : ''}`);
  };

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "أحمد المرابط",
      city: "الرباط",
      service: "تنظيف",
      rating: 5,
      comment: "خدمة ممتازة وسريعة. المعلم كان محترف جداً ونظف البيت بشكل رائع. أنصح بشدة!",
      avatar: "أ"
    },
    {
      id: 2,
      name: "فاطمة العلوي",
      city: "الدار البيضاء",
      service: "سباكة",
      rating: 5,
      comment: "حل مشكلة السباكة بسرعة وبأسعار معقولة. معلم موثوق ومتمكن من عمله.",
      avatar: "ف"
    },
    {
      id: 3,
      name: "يوسف التازي",
      city: "سلا",
      service: "كهرباء",
      rating: 5,
      comment: "أفضل تطبيق للعثور على معلمين موثوقين. سهل الاستخدام والتواصل سريع.",
      avatar: "ي"
    }
  ];

  // Popular services data
  const popularServices = [
    { name: "تنظيف", icon: "🧹", color: "bg-blue-50 text-blue-600" },
    { name: "سباكة", icon: "🔧", color: "bg-green-50 text-green-600" },
    { name: "كهرباء", icon: "⚡", color: "bg-yellow-50 text-yellow-600" },
    { name: "دهان", icon: "🎨", color: "bg-purple-50 text-purple-600" },
    { name: "نجارة", icon: "🔨", color: "bg-orange-50 text-orange-600" },
    { name: "تكييف", icon: "❄️", color: "bg-cyan-50 text-cyan-600" }
  ];

  return (
    <Layout>
      <Header />
      
      {/* Enhanced Hero Section */}
      <div className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
        
        <div className="relative text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent font-medium rounded-full text-sm">
              ✨ أكثر من 500 معلم موثوق في خدمتك
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            احجز مقدمي خدمات <span className="text-primary">موثوقين</span> في مدينتك
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            التنظيف، السباكة، التصليحات والمزيد — كل ما تحتاجه من خدمات منزلية بجودة عالية وأسعار مناسبة
          </p>
          
          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اختر المدينة
                </label>
                <Select value={selectedCity} onValueChange={setSelectedCity} disabled={citiesLoading}>
                  <SelectTrigger className="w-full text-right h-12">
                    <SelectValue placeholder={citiesLoading ? "جاري التحميل..." : "اختر مدينتك"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities?.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اختر الخدمة
                </label>
                <Select value={selectedService} onValueChange={setSelectedService} disabled={servicesLoading}>
                  <SelectTrigger className="w-full text-right h-12">
                    <SelectValue placeholder={servicesLoading ? "جاري التحميل..." : "نوع الخدمة"} />
                  </SelectTrigger>
                  <SelectContent>
                    {services?.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
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
              className="w-full bg-primary hover:bg-primary/90 text-lg py-4 h-14 shadow-lg hover:shadow-xl transition-all"
              disabled={citiesLoading || servicesLoading}
            >
              ابحث عن معلم الآن
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-gray-600">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>معلمون مُتحققون</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>استجابة سريعة</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span>تقييمات عالية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">الخدمات الأكثر طلباً</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر من أشهر الخدمات المطلوبة في المغرب
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {popularServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${service.color} group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
              </CardContent>
            </Card>
          ))}
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
          <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">معلمون موثقون</h3>
            <p className="text-gray-600">جميع مقدمي الخدمات تم التحقق منهم بعناية لضمان الجودة والموثوقية</p>
          </Card>
          
          <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">حجز سريع</h3>
            <p className="text-gray-600">احجز في دقائق وستحصل على رد سريع من المعلم المناسب</p>
          </Card>
          
          <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">تواصل مباشر</h3>
            <p className="text-gray-600">تواصل مباشر عبر الهاتف أو واتساب مع إمكانية المتابعة المستمرة</p>
          </Card>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-primary text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold mb-2">500+</div>
            <div className="text-primary-foreground/80">معلم موثوق</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold mb-2">1000+</div>
            <div className="text-primary-foreground/80">عميل راضي</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold mb-2">15+</div>
            <div className="text-primary-foreground/80">نوع خدمة</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold mb-2">24/7</div>
            <div className="text-primary-foreground/80">دعم العملاء</div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">ماذا يقول عملاؤنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اقرأ تجارب العملاء الحقيقية مع خدماتنا
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 text-right">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.city} • {testimonial.service}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3 justify-end">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-right leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">جاهز للبدء؟</h2>
          <p className="text-xl text-gray-600 mb-8">
            ابحث عن أفضل مقدمي الخدمات في مدينتك الآن
          </p>
          <Button 
            onClick={handleSearch}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 h-14 shadow-lg hover:shadow-xl transition-all"
          >
            ابدأ البحث الآن
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
