
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
      console.log('Creating booking with simplified validation:', bookingData);
      
      // Basic validation - only check required fields
      if (!bookingData.full_name || !bookingData.phone || !bookingData.requested_date || 
          !bookingData.requested_time || !bookingData.service_provider_id) {
        throw new Error('جميع الحقول المطلوبة يجب أن تكون مملوءة');
      }

      // Basic sanitization - just trim whitespace
      const cleanData = {
        full_name: bookingData.full_name.trim(),
        phone: bookingData.phone.trim(),
        whatsapp: bookingData.whatsapp?.trim() || null,
        requested_date: bookingData.requested_date,
        requested_time: bookingData.requested_time,
        description: bookingData.description?.trim() || null,
        service_provider_id: bookingData.service_provider_id,
      };

      console.log('Inserting booking data directly to Supabase:', cleanData);
      
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([cleanData])
        .select()
        .single();
      
      if (error) {
        console.error('Database insertion error:', error);
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
