
import { z } from 'zod';

// Simple sanitization functions
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  return input.trim().substring(0, 1000);
};

export const sanitizePhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  return email.toLowerCase().trim().substring(0, 254);
};

// Simplified validation schemas with minimal restrictions
export const bookingFormSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جداً'),
  
  phone: z
    .string()
    .min(8, 'رقم الهاتف قصير جداً')
    .max(15, 'رقم الهاتف طويل جداً'),
  
  whatsapp: z
    .string()
    .optional(),
  
  requested_date: z
    .string()
    .min(1, 'يجب اختيار تاريخ'),
  
  requested_time: z
    .string()
    .min(1, 'يجب اختيار وقت'),
  
  description: z
    .string()
    .max(500, 'الوصف طويل جداً')
    .optional(),
  
  service_provider_id: z
    .string()
    .min(1, 'معرف مقدم الخدمة مطلوب'),
});

export const providerApplicationSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جداً'),
  
  phone: z
    .string()
    .min(8, 'رقم الهاتف قصير جداً'),
  
  whatsapp: z
    .string()
    .optional(),
  
  email: z
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .optional(),
  
  city_id: z
    .string()
    .min(1, 'يجب اختيار مدينة'),
  
  service_type_id: z
    .string()
    .min(1, 'يجب اختيار نوع خدمة'),
  
  experience_years: z
    .number()
    .min(0, 'سنوات الخبرة لا يمكن أن تكون سالبة')
    .max(50, 'سنوات الخبرة مبالغ فيها'),
  
  experience_description: z
    .string()
    .min(10, 'وصف الخبرة قصير جداً')
    .max(1000, 'وصف الخبرة طويل جداً'),
  
  languages: z
    .array(z.string())
    .min(1, 'يجب اختيار لغة واحدة على الأقل'),
});

// Remove rate limiting completely for now
export const checkRateLimit = (): boolean => {
  return true; // Always allow for now
};

export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type ProviderApplicationData = z.infer<typeof providerApplicationSchema>;
