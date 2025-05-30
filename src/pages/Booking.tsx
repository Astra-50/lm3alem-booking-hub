import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useProvider } from '@/hooks/useProviders';
import { useCreateBooking } from '@/hooks/useBooking';

const Booking = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: provider, isLoading: providerLoading } = useProvider(providerId!);
  const createBookingMutation = useCreateBooking();
  
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
    
    // Enhanced validation
    if (!formData.fullName?.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الاسم الكامل",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.phone?.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الهاتف",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.date) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار التاريخ",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.time) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الوقت",
        variant: "destructive",
      });
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
        
        // Handle specific error types
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
        <Header />
        <div className="py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-8"></div>
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded"></div>
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
        <Header />
        <div className="py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-red-500 mb-4">لم يتم العثور على مقدم الخدمة</p>
            <Button onClick={() => navigate('/providers')}>
              العودة إلى قائمة مقدمي الخدمات
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      
      <div className="py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">احجز الخدمة</CardTitle>
              <p className="text-center text-gray-600">
                أكمل النموذج وسيتواصل معك {provider.name} قريباً
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-right block mb-2">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="text-right"
                    required
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-right block mb-2">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="0612345678"
                    className="text-right"
                    required
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* WhatsApp */}
                <div>
                  <Label htmlFor="whatsapp" className="text-right block mb-2">
                    رقم واتساب (اختياري)
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="0612345678"
                    className="text-right"
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-right block mb-2">
                      التاريخ المطلوب <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="text-right"
                      required
                      disabled={createBookingMutation.isPending}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time" className="text-right block mb-2">
                      الوقت المطلوب <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className="text-right"
                      required
                      disabled={createBookingMutation.isPending}
                    />
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-right block mb-2">
                    وصف العمل المطلوب
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="صف العمل الذي تحتاجه بالتفصيل..."
                    className="text-right min-h-[100px]"
                    rows={4}
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? 'جاري الإرسال...' : 'إرسال طلب الحجز'}
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  بإرسال هذا النموذج، أنت توافق على السماح لمقدم الخدمة بالتواصل معك
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
