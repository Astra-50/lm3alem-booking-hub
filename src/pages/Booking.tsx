
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useProvider } from '@/hooks/useProviders';
import { useCreateBooking } from '@/hooks/useBooking';
import PersonalInfoFields from '@/components/booking/PersonalInfoFields';
import DateTimeFields from '@/components/booking/DateTimeFields';
import DescriptionField from '@/components/booking/DescriptionField';
import BookingSubmitButton from '@/components/booking/BookingSubmitButton';
import { useBookingFormValidation } from '@/components/booking/BookingFormValidation';

const Booking = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: provider, isLoading: providerLoading } = useProvider(providerId!);
  const createBookingMutation = useCreateBooking();
  const { validateForm } = useBookingFormValidation();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    date: '',
    time: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started with data:', formData);
    console.log('Provider ID:', providerId);
    
    if (!validateForm(formData)) {
      return;
    }

    if (!providerId) {
      console.error('Provider ID is missing');
      toast({
        title: "خطأ",
        description: "معرف مقدم الخدمة غير صحيح",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating booking request...');
      
      const bookingData = {
        full_name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp?.trim() || undefined,
        requested_date: formData.date,
        requested_time: formData.time,
        description: formData.description?.trim() || undefined,
        service_provider_id: providerId,
      };
      
      console.log('Booking data prepared:', bookingData);
      
      const result = await createBookingMutation.mutateAsync(bookingData);
      
      console.log('Booking created successfully:', result);
      
      toast({
        title: "تم إرسال الطلب",
        description: "سيتم التواصل معك قريباً",
      });
      
      navigate('/confirmation', { 
        state: { 
          providerName: provider?.name,
          providerPhone: provider?.whatsapp || provider?.phone 
        } 
      });
    } catch (error: any) {
      console.error('Booking submission error:', error);
      
      let errorMessage = "حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى";
      
      if (error?.message) {
        console.error('Error message:', error.message);
        
        if (error.message.includes('violates row-level security')) {
          errorMessage = "خطأ في الأمان. يرجى المحاولة مرة أخرى";
        } else if (error.message.includes('duplicate key')) {
          errorMessage = "تم إرسال طلب مماثل من قبل";
        } else if (error.message.includes('foreign key')) {
          errorMessage = "مقدم الخدمة غير متاح";
        }
      }
      
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    console.log(`Field ${field} changed to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (providerLoading) {
    return (
      <Layout>
        <div className="py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-100 shadow-xl">
              <CardContent className="p-8">
                <div className="animate-pulse space-y-6">
                  <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl"></div>
                  <div className="h-4 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!provider) {
    return (
      <Layout>
        <div className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <div className="text-red-600 text-5xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-800 mb-4">لم يتم العثور على مقدم الخدمة</h3>
              <Button 
                onClick={() => navigate('/providers')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                العودة إلى قائمة مقدمي الخدمات
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-blue-100 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                احجز الخدمة
              </CardTitle>
              <p className="text-gray-600 text-lg mt-2">
                أكمل النموذج وسيتواصل معك {provider.name} قريباً
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <PersonalInfoFields
                  fullName={formData.fullName}
                  phone={formData.phone}
                  whatsapp={formData.whatsapp}
                  onChange={handleChange}
                  disabled={createBookingMutation.isPending}
                />
                
                <DateTimeFields
                  date={formData.date}
                  time={formData.time}
                  onChange={handleChange}
                  disabled={createBookingMutation.isPending}
                />
                
                <DescriptionField
                  description={formData.description}
                  onChange={handleChange}
                  disabled={createBookingMutation.isPending}
                />
                
                <BookingSubmitButton isLoading={createBookingMutation.isPending} />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
