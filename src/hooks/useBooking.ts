import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { bookingFormSchema, sanitizeString, sanitizePhoneNumber, checkRateLimit } from '@/utils/inputValidation';

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
      console.log('Starting booking validation for:', bookingData.full_name);
      
      // Client-side rate limiting check
      const clientIP = 'browser_' + (window.location.hostname || 'localhost');
      if (!checkRateLimit(clientIP, 3, 60000)) {
        throw new Error('معدل الطلبات مرتفع جداً. حاول مرة أخرى خلال دقيقة');
      }

      // Sanitize inputs before validation
      const sanitizedData = {
        ...bookingData,
        full_name: sanitizeString(bookingData.full_name),
        phone: sanitizePhoneNumber(bookingData.phone),
        whatsapp: bookingData.whatsapp ? sanitizePhoneNumber(bookingData.whatsapp) : undefined,
        description: bookingData.description ? sanitizeString(bookingData.description) : undefined,
      };

      // Validate with Zod schema
      try {
        const validatedData = bookingFormSchema.parse(sanitizedData);
        console.log('Data validation passed');
        
        // Call server-side validation function
        const { data: validationResult, error: fnError } = await supabase.functions.invoke('validate-booking', {
          body: validatedData
        });

        if (fnError) {
          console.error('Server validation failed:', fnError);
          throw new Error('فشل في التحقق من البيانات');
        }

        if (!validationResult.success) {
          console.error('Validation errors:', validationResult.errors);
          throw new Error(validationResult.errors.join(', '));
        }

        // Use server-sanitized data for the actual insert
        const finalData = validationResult.sanitized_data;
        console.log('Using server-sanitized data:', finalData);
        
        const { data, error } = await supabase
          .from('booking_requests')
          .insert([finalData])
          .select()
          .single();
        
        if (error) {
          console.error('Database insertion error:', error);
          throw error;
        }
        
        console.log('Booking created successfully:', data);
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
    onSuccess: (data) => {
      console.log('Booking mutation succeeded:', data);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Booking mutation failed:', error);
    },
  });
};
