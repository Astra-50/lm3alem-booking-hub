
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { Star, Users, CheckCircle, Clock, Phone, MessageCircle, Shield, Zap, Heart, ArrowLeft, Play, Award } from 'lucide-react';

const Index = () => {
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

  // Enhanced testimonials with more emotional impact
  const testimonials = [
    {
      id: 1,
      name: "أحمد المرابط",
      title: "مهندس برمجيات",
      city: "الرباط",
      service: "تنظيف",
      rating: 5,
      comment: "لم أكن أتوقع هذا المستوى من الاحترافية! معلم وصل في الوقت المحدد ونظف منزلي بطريقة لا تصدق. الآن أصدقائي يسألونني عن سري في النظافة!",
      avatar: "أ",
      verified: true,
      timeAgo: "منذ أسبوع"
    },
    {
      id: 2,
      name: "فاطمة العلوي",
      title: "طبيبة أسنان",
      city: "الدار البيضاء",
      service: "سباكة",
      rating: 5,
      comment: "كان لدي تسريب في المطبخ لأسابيع. في 30 دقيقة فقط، حل المعلم المشكلة تماماً! الخدمة كانت سريعة ومهنية للغاية.",
      avatar: "ف",
      verified: true,
      timeAgo: "منذ 3 أيام"
    },
    {
      id: 3,
      name: "يوسف التازي",
      title: "صاحب مطعم",
      city: "سلا",
      service: "كهرباء",
      rating: 5,
      comment: "التطبيق سهل جداً والمعلمين محترفين. حجزت معلم كهرباء لمطعمي وكانت الخدمة أكثر من رائعة. أنصح الجميع!",
      avatar: "ي",
      verified: true,
      timeAgo: "منذ يومين"
    }
  ];

  // Enhanced feature highlights
  const features = [
    {
      icon: Shield,
      title: "معلمون مُتحققون 100%",
      description: "جميع مقدمي الخدمات تم التحقق من هويتهم وخبرتهم بعناية فائقة",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Zap,
      title: "استجابة فورية",
      description: "احصل على رد خلال دقائق من أفضل المعلمين في منطقتك",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Heart,
      title: "رضا مضمون",
      description: "نضمن جودة الخدمة أو نعيد لك أموالك كاملة",
      color: "text-rose-500",
      bgColor: "bg-rose-50"
    },
    {
      icon: Award,
      title: "أفضل الأسعار",
      description: "أسعار عادلة وشفافة بدون رسوم خفية أو مفاجآت",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  // Popular services with enhanced design
  const popularServices = [
    { name: "تنظيف", icon: "🧹", color: "from-blue-500 to-blue-600", requests: "1200+ طلب" },
    { name: "سباكة", icon: "🔧", color: "from-green-500 to-green-600", requests: "800+ طلب" },
    { name: "كهرباء", icon: "⚡", color: "from-yellow-500 to-yellow-600", requests: "650+ طلب" },
    { name: "دهان", icon: "🎨", color: "from-purple-500 to-purple-600", requests: "400+ طلب" },
    { name: "نجارة", icon: "🔨", color: "from-orange-500 to-orange-600", requests: "350+ طلب" },
    { name: "تكييف", icon: "❄️", color: "from-cyan-500 to-cyan-600", requests: "300+ طلب" }
  ];

  // Success stats
  const stats = [
    { number: "2000+", label: "عميل سعيد", icon: Users },
    { number: "500+", label: "معلم موثوق", icon: Shield },
    { number: "98%", label: "معدل الرضا", icon: Heart },
    { number: "24/7", label: "دعم فني", icon: Clock }
  ];

  return (
    <Layout>
      <Header />
      
      {/* HERO SECTION - The crown jewel */}
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
          
          {/* Main headline - psychological perfection */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              معلمك المثالي
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              على بُعد نقرة
            </span>
          </h1>
          
          {/* Subheadline that hits the soul */}
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

      {/* SOCIAL PROOF STATS - Mount Olympus level */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">أرقام تتحدث عن نفسها</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              انضم إلى آلاف العملاء الذين اختاروا الأفضل
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPULAR SERVICES - Destiny-level CTAs */}
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">الخدمات الأكثر طلباً</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اختر من أشهر الخدمات التي يثق بها آلاف العملاء يومياً
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {popularServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:scale-105 overflow-hidden">
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{service.requests}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* FEATURES - Life-changing descriptions */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">لماذا نحن الأفضل؟</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تجربة مُصممة بعناية لتقديم أفضل خدمة منزلية في المغرب
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group text-center p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS - Mount Olympus level social proof */}
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">قصص نجاح حقيقية</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اقرأ تجارب عملائنا الذين غيّرت خدماتنا حياتهم اليومية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4 shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.title}</p>
                    <p className="text-xs text-gray-500">{testimonial.city} • {testimonial.service} • {testimonial.timeAgo}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4 justify-end">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-right leading-relaxed text-lg">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FINAL CTA - Destiny level perfection */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">جاهز لتجربة الأفضل؟</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
            انضم إلى آلاف العملاء الذين اختاروا الجودة والاحترافية
          </p>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:justify-center">
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-6 h-16 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              <Zap className="w-6 h-6 mr-3" />
              ابدأ الآن مجاناً
            </Button>
            
            <Button 
              variant="outline"
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-10 py-6 h-16 rounded-xl font-bold transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-3" />
              شاهد كيف يعمل
            </Button>
          </div>
          
          <p className="text-blue-200 mt-8 text-lg">
            🔒 آمن ومضمون • ⚡ استجابة فورية • 💯 رضا مضمون
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
