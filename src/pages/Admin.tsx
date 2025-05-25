import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { 
  useAdminProviders, 
  useAdminBookings,
  useUpdateProviderVerification,
  useUpdateBookingStatus
} from '@/hooks/useAdminData';
import AdminLogin from '@/components/AdminLogin';
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
import { Database } from '@/integrations/supabase/types';

type BookingStatus = Database['public']['Enums']['booking_status'];

const Admin = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminAuth();
  const { data: providers, isLoading: providersLoading } = useAdminProviders();
  const { data: bookings, isLoading: bookingsLoading } = useAdminBookings();
  const updateVerification = useUpdateProviderVerification();
  const updateBookingStatus = useUpdateBookingStatus();
  const { toast } = useToast();

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<BookingStatus>('جديد');
  const [adminNotes, setAdminNotes] = useState('');

  if (adminLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>جاري التحقق من الصلاحيات...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  const handleVerificationToggle = (providerId: string, currentStatus: boolean) => {
    updateVerification.mutate({
      id: providerId,
      isVerified: !currentStatus
    });
  };

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'جديد': return 'destructive';
      case 'تم التواصل': return 'secondary';
      case 'مكتمل': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">
              مرحباً، {user.email}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Providers Management */}
          <Card>
            <CardHeader>
              <CardTitle>إدارة مقدمي الخدمات</CardTitle>
            </CardHeader>
            <CardContent>
              {providersLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p>جاري تحميل مقدمي الخدمات...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {providers?.map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{provider.name}</h3>
                          <p className="text-sm text-gray-600">
                            {provider.service_types?.name} - {provider.cities?.name}
                          </p>
                          {provider.neighborhoods && (
                            <p className="text-sm text-gray-500">
                              {provider.neighborhoods.name}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">{provider.phone}</p>
                        </div>
                        <Badge variant={provider.is_verified ? "default" : "secondary"}>
                          {provider.is_verified ? "موثق" : "غير موثق"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={provider.is_verified ? "secondary" : "default"}
                          onClick={() => handleVerificationToggle(provider.id, provider.is_verified)}
                          disabled={updateVerification.isPending}
                        >
                          {provider.is_verified ? "إلغاء التوثيق" : "توثيق"}
                        </Button>
                        <a href={`tel:${provider.phone}`}>
                          <Button size="sm" variant="outline">
                            اتصال
                          </Button>
                        </a>
                        {provider.whatsapp && (
                          <a 
                            href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}`}
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
                  {providers?.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      لا توجد مقدمي خدمات حالياً
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookings Management */}
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
                          <p className="text-sm text-gray-500">
                            {booking.requested_date} - {booking.phone}
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setNewStatus(booking.status as BookingStatus);
                                setAdminNotes(booking.admin_notes || '');
                              }}
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
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
