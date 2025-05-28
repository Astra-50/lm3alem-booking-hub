
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Edit } from 'lucide-react';
import { useUpdateProvider } from '@/hooks/useAdminData';

interface EditProviderDialogProps {
  provider: any;
}

const EditProviderDialog = ({ provider }: EditProviderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState<string[]>(provider.languages || ['العربية']);
  const [newLanguage, setNewLanguage] = useState('');
  
  const updateProvider = useUpdateProvider();

  const form = useForm({
    defaultValues: {
      name: provider.name || '',
      phone: provider.phone || '',
      whatsapp: provider.whatsapp || '',
      experience_description: provider.experience_description || '',
      profile_image_url: provider.profile_image_url || '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProvider.mutateAsync({
        id: provider.id,
        ...data,
        languages,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating provider:', error);
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter(l => l !== lang));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تعديل بيانات مقدم الخدمة</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>واتساب (اختياري)</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                  <FormLabel>وصف الخبرة</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profile_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط الصورة الشخصية</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>اللغات</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {languages.map((lang, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeLanguage(lang)}>
                    {lang} ✕
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="أضف لغة جديدة"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                />
                <Button type="button" onClick={addLanguage} variant="outline">
                  إضافة
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={updateProvider.isPending}>
                {updateProvider.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProviderDialog;
