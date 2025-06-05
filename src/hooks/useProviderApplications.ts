import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { providerApplicationSchema, sanitizeString, sanitizePhoneNumber, sanitizeEmail, checkRateLimit } from '@/utils/inputValidation';

export interface ProviderApplication {
  id: string;
  full_name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city_id: string;
  service_type_id: string;
  experience_years: number;
  experience_description: string;
  languages: string[];
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  cities?: {
    name: string;
  };
  service_types?: {
    name: string;
  };
}

export const useProviderApplications = () => {
  return useQuery({
    queryKey: ['provider-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_applications')
        .select(`
          *,
          cities:city_id(name),
          service_types:service_type_id(name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching provider applications:', error);
        throw error;
      }

      return data as ProviderApplication[];
    },
  });
};

export const useCreateProviderApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (applicationData: any) => {
      console.log('Starting provider application validation');
      
      // Client-side rate limiting check
      const clientIP = 'browser_' + (window.location.hostname || 'localhost');
      if (!checkRateLimit(clientIP + '_application', 2, 300000)) { // 2 per 5 minutes
        throw new Error('معدل الطلبات مرتفع جداً. حاول مرة أخرى خلال 5 دقائق');
      }

      // Sanitize inputs before validation
      const sanitizedData = {
        ...applicationData,
        full_name: sanitizeString(applicationData.full_name),
        phone: sanitizePhoneNumber(applicationData.phone),
        whatsapp: applicationData.whatsapp ? sanitizePhoneNumber(applicationData.whatsapp) : undefined,
        email: applicationData.email ? sanitizeEmail(applicationData.email) : undefined,
        experience_description: sanitizeString(applicationData.experience_description),
      };

      try {
        // Validate with Zod schema
        const validatedData = providerApplicationSchema.parse(sanitizedData);
        console.log('Provider application validation passed');
        
        const { data, error } = await supabase
          .from('provider_applications')
          .insert([validatedData])
          .select()
          .single();
        
        if (error) {
          console.error('Database insertion error:', error);
          throw error;
        }
        
        console.log('Provider application created successfully:', data);
        return data;
        
      } catch (validationError: any) {
        console.error('Validation failed:', validationError);
        if (validationError.errors) {
          // Zod validation errors
          const errorMessages = validationError.errors.map((err: any) => err.message);
          throw new Error(errorMessages.join(', '));
        }
        throw validationError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
      toast({
        title: 'تم إرسال الطلب بنجاح',
        description: 'سيتم مراجعة طلبك والرد عليك قريباً',
      });
    },
    onError: (error: any) => {
      console.error('Provider application mutation failed:', error);
      toast({
        title: 'خطأ في إرسال الطلب',
        description: error.message || 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      admin_notes 
    }: { 
      id: string; 
      status: 'approved' | 'rejected'; 
      admin_notes?: string;
    }) => {
      const { error } = await supabase
        .from('provider_applications')
        .update({ 
          status, 
          admin_notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
    },
    onError: (error) => {
      console.error('Error updating application status:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة الطلب',
        variant: 'destructive',
      });
    },
  });
};
