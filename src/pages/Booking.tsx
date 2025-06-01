
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useProvider } from '@/hooks/useProviders';
import { useCreateBooking } from '@/hooks/useBooking';
import { Calendar, Clock, User, Phone, MessageSquare } from 'lucide-react';

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
                {/* Full Name */}
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>الاسم الكامل <span className="text-red-500">*</span></span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
                    required
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* Phone */}
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>رقم الهاتف <span className="text-red-500">*</span></span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="0612345678"
                    className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
                    required
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* WhatsApp */}
                <div className="space-y-3">
                  <Label htmlFor="whatsapp" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span>رقم واتساب (اختياري)</span>
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="0612345678"
                    className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="date" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>التاريخ المطلوب <span className="text-red-500">*</span></span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
                      required
                      disabled={createBookingMutation.isPending}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="time" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>الوقت المطلوب <span className="text-red-500">*</span></span>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
                      required
                      disabled={createBookingMutation.isPending}
                    />
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-right text-lg font-medium">
                    وصف العمل المطلوب
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="صف العمل الذي تحتاجه بالتفصيل..."
                    className="text-right min-h-[120px] border-blue-200 focus:border-blue-400 focus:ring-blue-400/50 resize-none"
                    rows={5}
                    disabled={createBookingMutation.isPending}
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-4 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>جاري الإرسال...</span>
                    </div>
                  ) : (
                    'إرسال طلب الحجز'
                  )}
                </Button>
                
                <p className="text-sm text-gray-600 text-center bg-blue-50 p-4 rounded-xl">
                  <span className="font-medium">ملاحظة:</span> بإرسال هذا النموذج، أنت توافق على السماح لمقدم الخدمة بالتواصل معك
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
