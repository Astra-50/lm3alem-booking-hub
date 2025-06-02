
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
