
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Phone, MapPin, Briefcase } from 'lucide-react';

const joinProviderSchema = z.object({
  full_name: z.string().min(2, 'الاسم الكامل مطلوب'),
  phone: z.string().min(10, 'رقم الهاتف مطلوب'),
  whatsapp: z.string().optional(),
  email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  city_id: z.string().min(1, 'المدينة مطلوبة'),
  service_type_id: z.string().min(1, 'نوع الخدمة مطلوب'),
  experience_years: z.string().min(1, 'سنوات الخبرة مطلوبة'),
  experience_description: z.string().min(20, 'وصف الخبرة يجب أن يكون 20 حرف على الأقل'),
  languages: z.string().min(1, 'اللغات مطلوبة'),
});

type JoinProviderForm = z.infer<typeof joinProviderSchema>;

const JoinProvider = () => {
  const { toast } = useToast();
  const { data: cities = [] } = useCities();
  const { data: serviceTypes = [] } = useServiceTypes();
  
  const form = useForm<JoinProviderForm>({
    resolver: zodResolver(joinProviderSchema),
    defaultValues: {
      full_name: '',
      phone: '',
      whatsapp: '',
      email: '',
      city_id: '',
      service_type_id: '',
      experience_years: '',
      experience_description: '',
      languages: 'العربية',
    },
  });

  const onSubmit = async (data: JoinProviderForm) => {
    try {
      const { error } = await supabase
        .from('provider_applications' as any)
        .insert([{
          full_name: data.full_name,
          phone: data.phone,
          whatsapp: data.whatsapp || null,
          email: data.email || null,
          city_id: data.city_id,
          service_type_id: data.service_type_id,
          experience_years: parseInt(data.experience_years),
          experience_description: data.experience_description,
          languages: data.languages.split(',').map(lang => lang.trim()),
        }]);

      if (error) throw error;

      toast({
        title: "تم إرسال طلبك بنجاح!",
        description: "سنتواصل معك قريباً لمراجعة طلبك",
        variant: "default",
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "خطأ في إرسال الطلب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                انضم كمقدم خدمة
              </CardTitle>
              <p className="text-gray-600 text-base md:text-lg">
                كن جزءاً من شبكة المعلمين المحترفين في المغرب
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">الاسم الكامل *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="أدخل اسمك الكامل" className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            رقم الهاتف *
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="0612345678" className="h-12 ltr text-left font-mono" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">واتساب (اختياري)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="0612345678" className="h-12 ltr text-left font-mono" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">البريد الإلكتروني (اختياري)</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="example@email.com" className="h-12 ltr text-left" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="city_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            المدينة *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="اختر مدينتك" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.id} value={city.id}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service_type_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            نوع الخدمة *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="اختر نوع الخدمة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceTypes.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="experience_years"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">سنوات الخبرة *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="اختر سنوات الخبرة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">أقل من سنة</SelectItem>
                              <SelectItem value="2">1-2 سنة</SelectItem>
                              <SelectItem value="5">3-5 سنوات</SelectItem>
                              <SelectItem value="10">6-10 سنوات</SelectItem>
                              <SelectItem value="15">أكثر من 10 سنوات</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">اللغات *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="العربية، الفرنسية، الإنجليزية" className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="experience_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">وصف الخبرة والمهارات *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="اكتب وصفاً تفصيلياً عن خبرتك ومهاراتك في هذا المجال..."
                            className="min-h-[100px] md:min-h-[120px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">ملاحظة مهمة:</h3>
                    <p className="text-blue-700 text-sm">
                      سيتم مراجعة طلبك من قبل فريقنا والتواصل معك خلال 48 ساعة. 
                      نحن نتأكد من جودة جميع مقدمي الخدمات لضمان أفضل تجربة لعملائنا.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-primary hover:bg-primary/90"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        جاري الإرسال...
                      </div>
                    ) : (
                      'إرسال الطلب'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default JoinProvider;
