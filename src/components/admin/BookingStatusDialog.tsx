
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateBookingStatus } from '@/hooks/useAdminData';
import { Database } from '@/integrations/supabase/types';

type BookingStatus = Database['public']['Enums']['booking_status'];

interface BookingStatusDialogProps {
  booking: any;
  onBookingSelect: (booking: any) => void;
}

const BookingStatusDialog = ({ booking, onBookingSelect }: BookingStatusDialogProps) => {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<BookingStatus>('جديد');
  const [adminNotes, setAdminNotes] = useState('');
  const updateBookingStatus = useUpdateBookingStatus();

  const handleUpdateBookingStatus = () => {
    if (!selectedBooking || !newStatus) return;

    updateBookingStatus.mutate({
      id: selectedBooking.id,
      status: newStatus,
      adminNotes: adminNotes
    });

    setSelectedBooking(null);
    setNewStatus('جديد');
    setAdminNotes('');
  };

  const handleDialogOpen = () => {
    setSelectedBooking(booking);
    setNewStatus(booking.status as BookingStatus);
    setAdminNotes(booking.admin_notes || '');
    onBookingSelect(booking);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleDialogOpen}
        >
          تحديث الحالة
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تحديث حالة الحجز</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">الحالة الجديدة</label>
            <Select value={newStatus} onValueChange={(value: BookingStatus) => setNewStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="جديد">جديد</SelectItem>
                <SelectItem value="تم التواصل">تم التواصل</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">ملاحظات إدارية</label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="إضافة ملاحظات..."
              className="text-right"
              dir="rtl"
            />
          </div>
          <Button 
            onClick={handleUpdateBookingStatus}
            disabled={updateBookingStatus.isPending}
            className="w-full"
          >
            {updateBookingStatus.isPending ? "جاري التحديث..." : "تحديث"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingStatusDialog;
