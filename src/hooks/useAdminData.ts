
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminProviders = () => {
  return useQuery({
    queryKey: ['admin-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          service_types(name),
          cities(name),
          neighborhoods(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminBookings = () => {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booking_requests')
        .select(`
          *,
          service_providers(name, service_types(name))
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateProviderVerification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, isVerified }: { id: string; isVerified: boolean }) => {
      const { data, error } = await supabase
        .from('service_providers')
        .update({ is_verified: isVerified })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Create audit log
      await supabase.rpc('create_audit_log', {
        _action: 'UPDATE',
        _table_name: 'service_providers',
        _record_id: id,
        _new_values: { is_verified: isVerified }
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-providers'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث حالة التوثيق",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة التوثيق",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, status, adminNotes }: { 
      id: string; 
      status: string; 
      adminNotes?: string;
    }) => {
      const { data, error } = await supabase
        .from('booking_requests')
        .update({ 
          status,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Create audit log
      await supabase.rpc('create_audit_log', {
        _action: 'UPDATE',
        _table_name: 'booking_requests',
        _record_id: id,
        _new_values: { status, admin_notes: adminNotes }
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث حالة الحجز",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة الحجز",
        variant: "destructive",
      });
    },
  });
};
