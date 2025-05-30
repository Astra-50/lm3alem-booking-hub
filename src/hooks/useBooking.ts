
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
      console.log('Attempting to create booking with data:', bookingData);
      
      // Validate required fields
      if (!bookingData.full_name || !bookingData.phone || !bookingData.requested_date || !bookingData.requested_time || !bookingData.service_provider_id) {
        throw new Error('Missing required fields');
      }
      
      // Ensure phone number is properly formatted
      const formattedPhone = bookingData.phone.trim();
      
      const insertData = {
        full_name: bookingData.full_name.trim(),
        phone: formattedPhone,
        whatsapp: bookingData.whatsapp?.trim() || null,
        requested_date: bookingData.requested_date,
        requested_time: bookingData.requested_time,
        description: bookingData.description?.trim() || null,
        service_provider_id: bookingData.service_provider_id,
      };
      
      console.log('Formatted booking data:', insertData);
      
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([insertData])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase booking error:', error);
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }
      
      console.log('Booking created successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Booking mutation succeeded:', data);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Booking mutation failed:', error);
    },
  });
};
