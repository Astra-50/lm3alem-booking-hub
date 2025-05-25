
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UseProvidersParams {
  cityId?: string;
  serviceTypeId?: string;
}

export const useProviders = ({ cityId, serviceTypeId }: UseProvidersParams = {}) => {
  return useQuery({
    queryKey: ['providers', cityId, serviceTypeId],
    queryFn: async () => {
      let query = supabase
        .from('service_providers')
        .select(`
          *,
          service_types(name, name_en),
          cities(name, name_en),
          neighborhoods(name)
        `)
        .eq('is_active', true);

      if (cityId) {
        query = query.eq('city_id', cityId);
      }
      
      if (serviceTypeId) {
        query = query.eq('service_type_id', serviceTypeId);
      }

      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useProvider = (id: string) => {
  return useQuery({
    queryKey: ['provider', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          service_types(name, name_en),
          cities(name, name_en),
          neighborhoods(name)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
