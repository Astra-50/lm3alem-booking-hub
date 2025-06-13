
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProviderProfileHeader from '@/components/ProviderProfileHeader';
import { Button } from '@/components/ui/button';
import { useProvider } from '@/hooks/useProviders';
import ProviderAboutSection from '@/components/profile/ProviderAboutSection';
import ProviderWorkingHoursSection from '@/components/profile/ProviderWorkingHoursSection';
import ProviderLanguagesCard from '@/components/profile/ProviderLanguagesCard';
import ProviderContactCard from '@/components/profile/ProviderContactCard';
import ProviderBookingCTA from '@/components/profile/ProviderBookingCTA';

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
                <ProviderAboutSection experienceDescription={provider.experience_description} />

                {/* Working Hours */}
                <ProviderWorkingHoursSection workingHours={provider.working_hours} />
              </div>

              {/* Sidebar */}
              <div className="space-y-4 md:space-y-6">
                {/* Languages */}
                <ProviderLanguagesCard languages={provider.languages} />
                
                {/* Contact Info */}
                <ProviderContactCard phone={provider.phone} whatsapp={provider.whatsapp} />
              </div>
            </div>
            
            {/* CTA Section */}
            <ProviderBookingCTA providerId={provider.id} providerName={provider.name} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderProfile;
