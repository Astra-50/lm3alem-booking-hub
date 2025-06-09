
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCreateBooking } from '@/hooks/useBooking';
import PersonalInfoFields from './PersonalInfoFields';
import DateTimeFields from './DateTimeFields';
import DescriptionField from './DescriptionField';
import BookingSubmitButton from './BookingSubmitButton';
import BookingHeader from './BookingHeader';
import { useBookingFormValidation } from './BookingFormValidation';

interface BookingFormProps {
  providerId: string;
  providerName: string;
  providerPhone?: string;
  providerWhatsapp?: string;
}

const BookingForm = ({ providerId, providerName, providerPhone, providerWhatsapp }: BookingFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
          providerName: providerName,
          providerPhone: providerWhatsapp || providerPhone 
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

  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="border-blue-100 shadow-2xl bg-white/95 backdrop-blur-sm">
          <BookingHeader providerName={providerName} />
          
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
  );
};

export default BookingForm;
