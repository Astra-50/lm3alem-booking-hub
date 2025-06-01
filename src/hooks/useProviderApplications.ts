
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ProviderApplication {
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
  created_at: string;
  cities?: { name: string };
  service_types?: { name: string };
}

export const useProviderApplications = () => {
  return useQuery({
    queryKey: ['provider-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_applications')
        .select(`
          *,
          cities(name),
          service_types(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProviderApplication[];
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from('provider_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-applications'] });
    },
  });
};
