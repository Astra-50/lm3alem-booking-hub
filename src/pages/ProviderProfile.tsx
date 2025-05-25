
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - in real app this would come from Supabase
const mockProvider = {
  id: '1',
  name: 'أحمد الصالحي',
  service: 'تنظيف منازل وشقق',
  city: 'الرباط',
  neighborhood: 'أكدال',
  experience: 'خبرة 8 سنوات في تنظيف المنازل والشقق بأحدث المعدات والمواد الآمنة. أضمن لك نظافة عالية الجودة مع الحفاظ على ممتلكاتك.',
  services: ['تنظيف عام للمنزل', 'تنظيف النوافذ', 'تنظيف السجاد', 'تنظيف المطابخ'],
  languages: ['العربية', 'الفرنسية'],
  availability: 'متاح من الإثنين إلى الجمعة، 10 صباحًا - 6 مساءً',
  isVerified: true,
  whatsapp: '+212612345678',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
};

const ProviderProfile = () => {
  const { id } = useParams();

  return (
    <Layout>
      <Header />
      
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-8 border-b">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src={mockProvider.image} 
                      alt={mockProvider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {mockProvider.name}
                    </h1>
                    {mockProvider.isVerified && (
                      <Badge className="bg-accent text-accent-foreground">
                        ✅ موثّق من معلم
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xl text-primary font-medium mb-2">
                    {mockProvider.service}
                  </p>
                  
                  <p className="text-gray-600 mb-4">
                    📍 {mockProvider.city} - {mockProvider.neighborhood}
                  </p>
                  
                  <Link to={`/booking/${mockProvider.id}`}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      احجز هذا المعلم
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Details Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">نبذة عن المعلم</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {mockProvider.experience}
                  </p>
                </CardContent>
              </Card>
              
              {/* Services */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">الخدمات المتوفرة</h2>
                  <ul className="space-y-2">
                    {mockProvider.services.map((service, index) => (
                      <li key={index} className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-primary">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Languages */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">اللغات</h2>
                  <div className="flex flex-wrap gap-2">
                    {mockProvider.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Availability */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">أوقات العمل</h2>
                  <p className="text-gray-700">{mockProvider.availability}</p>
                  
                  {mockProvider.whatsapp && (
                    <div className="mt-4">
                      <a
                        href={`https://wa.me/${mockProvider.whatsapp.replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 space-x-reverse text-green-600 hover:text-green-700"
                      >
                        <span>📱</span>
                        <span>تواصل عبر واتساب</span>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">جاهز للحجز؟</h3>
              <p className="text-gray-600 mb-6">
                احجز الآن واحصل على خدمة عالية الجودة من {mockProvider.name}
              </p>
              <Link to={`/booking/${mockProvider.id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  احجز الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderProfile;
