
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProviderProfileHeader from '@/components/ProviderProfileHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Globe, Clock, Award } from 'lucide-react';
import { useProvider } from '@/hooks/useProviders';
import WorkingHoursCard from '@/components/WorkingHoursCard';
import PhoneDisplay from '@/components/PhoneDisplay';

interface WorkingHour {
  available: boolean;
  start: string;
  end: string;
}

interface WorkingHours {
  monday: WorkingHour;
  tuesday: WorkingHour;
  wednesday: WorkingHour;
  thursday: WorkingHour;
  friday: WorkingHour;
  saturday: WorkingHour;
  sunday: WorkingHour;
}

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: provider, isLoading, error } = useProvider(id!);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-4 md:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="p-4 md:p-8 border-b">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full mx-auto md:mx-0"></div>
                  <div className="flex-1 text-center md:text-right">
                    <div className="h-6 md:h-8 bg-gray-200 rounded mb-2 w-48 mx-auto md:mx-0"></div>
                    <div className="h-4 md:h-6 bg-gray-200 rounded mb-2 w-32 mx-auto md:mx-0"></div>
                    <div className="h-3 md:h-4 bg-gray-200 rounded mb-4 w-24 mx-auto md:mx-0"></div>
                    <div className="h-8 md:h-10 bg-gray-200 rounded w-32 mx-auto md:mx-0"></div>
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
        <div className="py-4 md:py-8">
          <div className="max-w-4xl mx-auto text-center px-4">
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
      <div className="py-4 md:py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden">
            {/* Enhanced Header */}
            <ProviderProfileHeader provider={provider} />
            
            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* About Section */}
                {provider.experience_description && (
                  <Card className="border-0 shadow-md">
                    <CardHeader className="pb-3 md:pb-6">
                      <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        <span>نبذة عن المعلم</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {provider.experience_description}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Working Hours */}
                {provider.working_hours && typeof provider.working_hours === 'object' && !Array.isArray(provider.working_hours) && (
                  <Card className="border-0 shadow-md">
                    <CardHeader className="pb-3 md:pb-6">
                      <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        <span>أوقات العمل</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <WorkingHoursCard workingHours={provider.working_hours as unknown as WorkingHours} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4 md:space-y-6">
                {/* Languages */}
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
                      <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span>اللغات</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages?.map((language, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Contact Info */}
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span>معلومات التواصل</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <PhoneDisplay phone={provider.phone} />
                      </div>
                      <a href={`tel:${provider.phone}`}>
                        <Button size="sm" variant="outline" className="text-xs md:text-sm">
                          اتصال
                        </Button>
                      </a>
                    </div>
                    
                    {provider.whatsapp && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <PhoneDisplay phone={provider.whatsapp} />
                        </div>
                        <a
                          href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm">
                            واتساب
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 md:p-8 text-center border-t">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900">جاهز للحجز؟</h3>
              <p className="text-gray-700 mb-4 md:mb-6 text-base md:text-lg">
                احجز الآن واحصل على خدمة عالية الجودة من {provider.name}
              </p>
              <Link to={`/booking/${provider.id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full md:w-auto">
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
