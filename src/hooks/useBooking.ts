
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BookingData {
  full_name: string;
  phone: string;
  whatsapp?: string;
  requested_date: string;
  requested_time: string;
  description?: string;
  service_provider_id: string;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: BookingData) => {
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([bookingData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
