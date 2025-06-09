
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminBookings } from '@/hooks/useAdminData';
import BookingStatusDialog from './BookingStatusDialog';
import PhoneDisplay from '@/components/PhoneDisplay';

const BookingsManagement = () => {
  const { data: bookings, isLoading: bookingsLoading } = useAdminBookings();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'جديد': return 'destructive';
      case 'تم التواصل': return 'secondary';
      case 'مكتمل': return 'default';
      default: return 'secondary';
    }
  };

  const handleBookingSelect = (booking: any) => {
    // This function is passed to BookingStatusDialog but doesn't need to do anything
    // since the dialog handles its own state
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة الحجوزات</CardTitle>
      </CardHeader>
      <CardContent>
        {bookingsLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>جاري تحميل الحجوزات...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings?.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{booking.full_name}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.service_providers?.service_types?.name} مع {booking.service_providers?.name}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <span>{booking.requested_date} -</span>
                      <PhoneDisplay phone={booking.phone} className="text-sm" />
                    </p>
                    {booking.description && (
                      <p className="text-xs text-gray-400 mt-1">
                        {booking.description}
                      </p>
                    )}
                  </div>
                  <Badge variant={getStatusBadgeVariant(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <BookingStatusDialog 
                    booking={booking}
                    onBookingSelect={handleBookingSelect}
                  />
                  <a href={`tel:${booking.phone}`}>
                    <Button size="sm" variant="outline">
                      اتصال بالعميل
                    </Button>
                  </a>
                  {booking.whatsapp && (
                    <a 
                      href={`https://wa.me/${booking.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        واتساب
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
            {bookings?.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                لا توجد حجوزات حالياً
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsManagement;
