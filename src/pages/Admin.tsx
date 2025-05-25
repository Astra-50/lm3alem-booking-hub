
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockProviders = [
  {
    id: '1',
    name: 'أحمد الصالحي',
    service: 'تنظيف',
    city: 'الرباط',
    phone: '0612345678',
    isVerified: true
  },
  {
    id: '2',
    name: 'محمد بن علي',
    service: 'سباكة',
    city: 'الدار البيضاء',
    phone: '0612345679',
    isVerified: false
  }
];

const mockBookings = [
  {
    id: '1',
    clientName: 'سارة أحمد',
    providerName: 'أحمد الصالحي',
    service: 'تنظيف',
    date: '2024-01-15',
    phone: '0612345680',
    status: 'جديد'
  },
  {
    id: '2',
    clientName: 'خالد محمد',
    providerName: 'محمد بن علي',
    service: 'سباكة',
    date: '2024-01-16',
    phone: '0612345681',
    status: 'تم التواصل'
  }
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in real app this would be more secure
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة الإدارة",
      });
    } else {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">دخول المدير</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-right"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  دخول
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            تسجيل الخروج
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Providers Management */}
          <Card>
            <CardHeader>
              <CardTitle>إدارة مقدمي الخدمات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProviders.map((provider) => (
                  <div key={provider.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-gray-600">
                          {provider.service} - {provider.city}
                        </p>
                        <p className="text-sm text-gray-500">{provider.phone}</p>
                      </div>
                      <Badge variant={provider.isVerified ? "default" : "secondary"}>
                        {provider.isVerified ? "موثق" : "غير موثق"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        تعديل
                      </Button>
                      <Button 
                        size="sm" 
                        variant={provider.isVerified ? "secondary" : "default"}
                      >
                        {provider.isVerified ? "إلغاء التوثيق" : "توثيق"}
                      </Button>
                      <a href={`tel:${provider.phone}`}>
                        <Button size="sm" variant="outline">
                          اتصال
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bookings Management */}
          <Card>
            <CardHeader>
              <CardTitle>إدارة الحجوزات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{booking.clientName}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.service} مع {booking.providerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.date} - {booking.phone}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          booking.status === 'جديد' ? 'destructive' :
                          booking.status === 'تم التواصل' ? 'secondary' : 'default'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        تحديث الحالة
                      </Button>
                      <a href={`tel:${booking.phone}`}>
                        <Button size="sm" variant="outline">
                          اتصال بالعميل
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
