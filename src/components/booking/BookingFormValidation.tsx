
import { useToast } from '@/hooks/use-toast';

interface FormData {
  fullName: string;
  phone: string;
  whatsapp: string;
  date: string;
  time: string;
  description: string;
}

export const useBookingFormValidation = () => {
  const { toast } = useToast();

  const validateForm = (formData: FormData): boolean => {
    console.log('Validating form data:', formData);
    
    if (!formData.fullName?.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الاسم الكامل",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.phone?.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الهاتف",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.date) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار التاريخ",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.time) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الوقت",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  return { validateForm };
};
