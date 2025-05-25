
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

const Booking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    date: '',
    time: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // In real app, this would submit to Supabase
    console.log('Booking submitted:', { ...formData, providerId });
    
    toast({
      title: "تم إرسال الطلب",
      description: "سيتم التواصل معك قريباً",
    });
    
    navigate('/confirmation');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <Header />
      
      <div className="py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">احجز الخدمة</CardTitle>
              <p className="text-center text-gray-600">
                أكمل النموذج وسيتواصل معك مقدم الخدمة قريباً
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
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                >
                  إرسال طلب الحجز
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
