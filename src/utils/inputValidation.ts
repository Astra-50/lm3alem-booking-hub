import { z } from 'zod';

// Sanitization functions
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  
  // Remove potentially dangerous HTML tags and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 1000); // Limit length to prevent DoS
};

export const sanitizePhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters except + at the beginning
  return phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
};

export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Basic email sanitization - remove dangerous chars
  return email
    .toLowerCase()
    .replace(/[<>'"]/g, '')
    .trim()
    .substring(0, 254); // RFC 5321 limit
};

// Validation schemas
export const bookingFormSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جداً')
    .regex(/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']+$/, 'الاسم يجب أن يحتوي على أحرف عربية فقط'),
  
  phone: z
    .string()
    .min(10, 'رقم الهاتف غير صحيح')
    .max(15, 'رقم الهاتف طويل جداً')
    .regex(/^(\+212|0)[5-7]\d{8}$/, 'رقم الهاتف المغربي غير صحيح'),
  
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || /^(\+212|0)[5-7]\d{8}$/.test(val), 'رقم الواتساب غير صحيح'),
  
  requested_date: z
    .string()
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'لا يمكن حجز موعد في الماضي'),
  
  requested_time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'صيغة الوقت غير صحيحة'),
  
  description: z
    .string()
    .max(500, 'الوصف طويل جداً')
    .optional(),
  
  service_provider_id: z
    .string()
    .uuid('معرف مقدم الخدمة غير صحيح'),
});

export const providerApplicationSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جداً')
    .regex(/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']+$/, 'الاسم يجب أن يحتوي على أحرف عربية فقط'),
  
  phone: z
    .string()
    .regex(/^(\+212|0)[5-7]\d{8}$/, 'رقم الهاتف المغربي غير صحيح'),
  
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || /^(\+212|0)[5-7]\d{8}$/.test(val), 'رقم الواتساب غير صحيح'),
  
  email: z
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .optional(),
  
  city_id: z
    .string()
    .uuid('يجب اختيار مدينة صحيحة'),
  
  service_type_id: z
    .string()
    .uuid('يجب اختيار نوع خدمة صحيح'),
  
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

// Rate limiting storage (in-memory for MVP, should use Redis in production)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

export const checkRateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const userLimit = rateLimitStore.get(identifier);
  
  if (!userLimit || now - userLimit.lastReset > windowMs) {
    rateLimitStore.set(identifier, { count: 1, lastReset: now });
    return true;
  }
  
  if (userLimit.count >= maxRequests) {
    return false;
  }
  
  userLimit.count++;
  return true;
};

export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type ProviderApplicationData = z.infer<typeof providerApplicationSchema>;
