
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle } from 'lucide-react';
import { useProvider } from '@/hooks/useProviders';
import WorkingHoursCard from '@/components/WorkingHoursCard';

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: provider, isLoading, error } = useProvider(id!);

  const formatPhoneNumber = (phone: string) => {
    // Simple phone formatting for Morocco
    if (phone.startsWith('0')) {
      return phone.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }
    return phone;
  };

  if (isLoading) {
    return (
      <Layout>
        <Header />
        <div className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="p-8 border-b">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
                  <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded mb-2 w-48"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-32"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-24"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !provider) {
    return (
      <Layout>
        <Header />
        <div className="py-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-500 mb-4">لم يتم العثور على مقدم الخدمة</p>
            <Link to="/providers">
              <Button>العودة إلى قائمة مقدمي الخدمات</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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
                    {provider.profile_image_url ? (
                      <img 
                        src={provider.profile_image_url} 
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-primary font-semibold text-4xl">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {provider.name}
                    </h1>
                    {provider.is_verified && (
                      <Badge className="bg-accent text-accent-foreground">
                        ✅ موثّق من معلم
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xl text-primary font-medium mb-2">
                    {provider.service_types?.name}
                  </p>
                  
                  <p className="text-gray-600 mb-4">
                    📍 {provider.cities?.name}{provider.neighborhoods?.name && ` - ${provider.neighborhoods.name}`}
                  </p>
                  
                  <Link to={`/booking/${provider.id}`}>
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
              {provider.experience_description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">نبذة عن المعلم</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {provider.experience_description}
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {/* Languages */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">اللغات</h2>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages?.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">التواصل</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{formatPhoneNumber(provider.phone)}</span>
                      <a href={`tel:${provider.phone}`} className="mr-auto">
                        <Button size="sm" variant="outline">
                          اتصال
                        </Button>
                      </a>
                    </div>
                    
                    {provider.whatsapp && (
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{formatPhoneNumber(provider.whatsapp)}</span>
                        <a
                          href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-auto"
                        >
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            واتساب
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Working Hours - Full Width */}
            {provider.working_hours && (
              <div className="px-8 pb-8">
                <WorkingHoursCard workingHours={provider.working_hours} />
              </div>
            )}
            
            {/* CTA Section */}
            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">جاهز للحجز؟</h3>
              <p className="text-gray-600 mb-6">
                احجز الآن واحصل على خدمة عالية الجودة من {provider.name}
              </p>
              <Link to={`/booking/${provider.id}`}>
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
