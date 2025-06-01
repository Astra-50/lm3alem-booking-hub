
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
      <div className="py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Enhanced Header */}
            <ProviderProfileHeader provider={provider} />
            
            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Section */}
                {provider.experience_description && (
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 space-x-reverse">
                        <Award className="w-5 h-5 text-primary" />
                        <span>نبذة عن المعلم</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {provider.experience_description}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Working Hours */}
                {provider.working_hours && typeof provider.working_hours === 'object' && !Array.isArray(provider.working_hours) && (
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="w-5 h-5 text-primary" />
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
              <div className="space-y-6">
                {/* Languages */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <Globe className="w-5 h-5 text-primary" />
                      <span>اللغات</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages?.map((language, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Contact Info */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>معلومات التواصل</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{provider.phone}</span>
                      </div>
                      <a href={`tel:${provider.phone}`}>
                        <Button size="sm" variant="outline">
                          اتصال
                        </Button>
                      </a>
                    </div>
                    
                    {provider.whatsapp && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{provider.whatsapp}</span>
                        </div>
                        <a
                          href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
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
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center border-t">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">جاهز للحجز؟</h3>
              <p className="text-gray-700 mb-6 text-lg">
                احجز الآن واحصل على خدمة عالية الجودة من {provider.name}
              </p>
              <Link to={`/booking/${provider.id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg">
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
