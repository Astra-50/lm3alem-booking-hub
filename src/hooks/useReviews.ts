import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  booking_request_id: string;
  service_provider_id: string;
  customer_name: string;
  rating: number;
  review_text?: string;
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProviderStats {
  id: string;
  service_provider_id: string;
  total_bookings: number;
  completed_bookings: number;
  average_rating: number;
  total_reviews: number;
  last_booking_at?: string;
  created_at: string;
  updated_at: string;
}

export const useProviderReviews = (providerId: string) => {
  return useQuery({
    queryKey: ['provider-reviews', providerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('service_provider_id', providerId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!providerId,
  });
};

export const useProviderStats = (providerId: string) => {
  return useQuery({
    queryKey: ['provider-stats', providerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_stats')
        .select('*')
        .eq('service_provider_id', providerId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as ProviderStats | null;
    },
    enabled: !!providerId,
  });
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (review: Omit<Review, 'id' | 'is_verified' | 'is_approved' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['provider-reviews', data.service_provider_id] });
      queryClient.invalidateQueries({ queryKey: ['provider-stats', data.service_provider_id] });
    },
  });
};

export const useAllProviderStats = () => {
  return useQuery({
    queryKey: ['all-provider-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_stats')
        .select('*');
      
      if (error) throw error;
      return data as ProviderStats[];
    },
  });
};