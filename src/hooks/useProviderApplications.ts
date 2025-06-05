
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      console.log('Creating provider application:', applicationData);
      
      // Simple validation - just check required fields
      if (!applicationData.full_name || !applicationData.phone || !applicationData.city_id || !applicationData.service_type_id) {
        throw new Error('جميع الحقول المطلوبة يجب أن تكون مملوءة');
      }

      // Prepare data for insertion - remove array wrapper and ensure all required fields are present
      const insertData = {
        full_name: applicationData.full_name,
        phone: applicationData.phone,
        whatsapp: applicationData.whatsapp || null,
        email: applicationData.email || null,
        city_id: applicationData.city_id,
        service_type_id: applicationData.service_type_id,
        experience_years: parseInt(applicationData.experience_years) || 0,
        experience_description: applicationData.experience_description,
        languages: Array.isArray(applicationData.languages) ? applicationData.languages : applicationData.languages.split(',').map((lang: string) => lang.trim()),
      };
      
      console.log('Insert data prepared:', insertData);
      
      const { data, error } = await supabase
        .from('provider_applications')
        .insert(insertData)
        .select()
        .single();
      
      if (error) {
        console.error('Database insertion error:', error);
        throw error;
      }
      
      console.log('Provider application created successfully:', data);
      return data;
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
