
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCities } from '@/hooks/useCities';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { X, Plus, Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

const defaultWorkingHours: WorkingHours = {
  monday: { available: true, start: '09:00', end: '18:00' },
  tuesday: { available: true, start: '09:00', end: '18:00' },
  wednesday: { available: true, start: '09:00', end: '18:00' },
  thursday: { available: true, start: '09:00', end: '18:00' },
  friday: { available: true, start: '09:00', end: '18:00' },
  saturday: { available: false, start: '09:00', end: '18:00' },
  sunday: { available: false, start: '09:00', end: '18:00' }
};

const dayNames = {
  monday: 'الاثنين',
  tuesday: 'الثلاثاء',
  wednesday: 'الأربعاء',
  thursday: 'الخميس',
  friday: 'الجمعة',
  saturday: 'السبت',
  sunday: 'الأحد'
};

const commonLanguages = [
  'العربية',
  'الفرنسية',
  'الإنجليزية',
  'الأمازيغية',
  'الإسبانية'
];

const AddProviderForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    serviceTypeId: '',
    cityId: '',
    neighborhoodId: '',
    experienceDescription: '',
    languages: ['العربية']
  });
  const [workingHours, setWorkingHours] = useState<WorkingHours>(defaultWorkingHours);
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  
  const { data: cities } = useCities();
  const { data: serviceTypes } = useServiceTypes();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch neighborhoods when city changes
  const fetchNeighborhoods = async (cityId: string) => {
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('city_id', cityId)
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching neighborhoods:', error);
      return;
    }
    
    setNeighborhoods(data || []);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `provider-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('provider-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('provider-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const createProvider = useMutation({
    mutationFn: async (data: any) => {
      let profileImageUrl = null;
      
      if (profileImage) {
        setIsUploading(true);
        try {
          profileImageUrl = await uploadImage(profileImage);
        } catch (error) {
          throw new Error('فشل في رفع الصورة');
        }
        setIsUploading(false);
      }

      const providerData = {
        ...data,
        profile_image_url: profileImageUrl
      };

      const { data: result, error } = await supabase
        .from('service_providers')
        .insert([providerData])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-providers'] });
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      toast({
        title: "تم إضافة مقدم الخدمة بنجاح",
        description: "تم إنشاء مقدم خدمة جديد",
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error creating provider:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في إضافة مقدم الخدمة",
        variant: "destructive",
      });
      setIsUploading(false);
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      serviceTypeId: '',
      cityId: '',
      neighborhoodId: '',
      experienceDescription: '',
      languages: ['العربية']
    });
    setWorkingHours(defaultWorkingHours);
    setNeighborhoods([]);
    setProfileImage(null);
    setImagePreview('');
    setNewLanguage('');
  };

  const handleCityChange = (cityId: string) => {
    setFormData({ ...formData, cityId, neighborhoodId: '' });
    fetchNeighborhoods(cityId);
  };

  const handleWorkingHourChange = (day: keyof WorkingHours, field: keyof WorkingHour, value: string | boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(lang => lang !== languageToRemove)
    });
  };

  const addLanguage = (language: string) => {
    if (language && !formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, language]
      });
      setNewLanguage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.serviceTypeId || !formData.cityId) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const providerData = {
      name: formData.name,
      phone: formData.phone,
      whatsapp: formData.whatsapp || null,
      service_type_id: formData.serviceTypeId,
      city_id: formData.cityId,
      neighborhood_id: formData.neighborhoodId || null,
      experience_description: formData.experienceDescription || null,
      languages: formData.languages,
      working_hours: workingHours,
      is_active: true,
      is_verified: false
    };

    createProvider.mutate(providerData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          إضافة مقدم خدمة جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة مقدم خدمة جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الصورة الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    اختياري - صورة شخصية لمقدم الخدمة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">الاسم *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="اسم مقدم الخدمة"
                    className="text-right"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">رقم الهاتف *</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0123456789"
                    className="text-right"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">واتساب (اختياري)</label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="0123456789"
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service and Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الخدمة والموقع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">نوع الخدمة *</label>
                  <Select value={formData.serviceTypeId} onValueChange={(value) => setFormData({ ...formData, serviceTypeId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">المدينة *</label>
                  <Select value={formData.cityId} onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities?.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">الحي (اختياري)</label>
                  <Select value={formData.neighborhoodId} onValueChange={(value) => setFormData({ ...formData, neighborhoodId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحي" />
                    </SelectTrigger>
                    <SelectContent>
                      {neighborhoods?.map((neighborhood) => (
                        <SelectItem key={neighborhood.id} value={neighborhood.id}>
                          {neighborhood.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">وصف الخبرة</label>
                <Textarea
                  value={formData.experienceDescription}
                  onChange={(e) => setFormData({ ...formData, experienceDescription: e.target.value })}
                  placeholder="وصف خبرة مقدم الخدمة..."
                  className="text-right"
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اللغات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.languages.map((language, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newLanguage} onValueChange={setNewLanguage}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="إضافة لغة جديدة" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonLanguages
                      .filter(lang => !formData.languages.includes(lang))
                      .map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addLanguage(newLanguage)}
                  disabled={!newLanguage}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ساعات العمل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(dayNames).map(([dayKey, dayName]) => {
                  const day = dayKey as keyof WorkingHours;
                  return (
                    <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-20 text-sm font-medium">{dayName}</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={workingHours[day].available}
                          onChange={(e) => handleWorkingHourChange(day, 'available', e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">متاح</span>
                      </div>
                      {workingHours[day].available && (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">من:</span>
                            <Input
                              type="time"
                              value={workingHours[day].start}
                              onChange={(e) => handleWorkingHourChange(day, 'start', e.target.value)}
                              className="w-24"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">إلى:</span>
                            <Input
                              type="time"
                              value={workingHours[day].end}
                              onChange={(e) => handleWorkingHourChange(day, 'end', e.target.value)}
                              className="w-24"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={createProvider.isPending || isUploading}
              className="flex-1"
            >
              {createProvider.isPending || isUploading ? "جاري الحفظ..." : "حفظ مقدم الخدمة"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProviderForm;
