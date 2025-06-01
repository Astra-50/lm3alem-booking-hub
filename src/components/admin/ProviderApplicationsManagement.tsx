
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProviderApplications, useUpdateApplicationStatus } from '@/hooks/useProviderApplications';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, UserX, Eye, Phone, Mail, MapPin, Briefcase, Clock } from 'lucide-react';
import PhoneDisplay from '@/components/PhoneDisplay';

interface ApplicationDetailsProps {
  application: any;
  onStatusUpdate: (status: 'approved' | 'rejected', notes?: string) => void;
}

const ApplicationDetails = ({ application, onStatusUpdate }: ApplicationDetailsProps) => {
  const [notes, setNotes] = useState(application.admin_notes || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'مقبول';
      case 'rejected': return 'مرفوض';
      default: return 'قيد المراجعة';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{application.full_name}</h3>
        <Badge className={getStatusColor(application.status)}>
          {getStatusText(application.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">الهاتف:</span>
            <PhoneDisplay phone={application.phone} />
          </div>
          
          {application.whatsapp && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">واتساب:</span>
              <PhoneDisplay phone={application.whatsapp} />
            </div>
          )}
          
          {application.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">البريد:</span>
              <span className="ltr text-left">{application.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">المدينة:</span>
            <span>{application.cities?.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">الخدمة:</span>
            <span>{application.service_types?.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">الخبرة:</span>
            <span>{application.experience_years} سنة</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">اللغات:</h4>
        <div className="flex flex-wrap gap-2">
          {application.languages?.map((lang: string, index: number) => (
            <Badge key={index} variant="outline">{lang}</Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">وصف الخبرة:</h4>
        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{application.experience_description}</p>
      </div>

      <div>
        <h4 className="font-medium mb-2">ملاحظات الإدارة:</h4>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="أضف ملاحظات حول هذا الطلب..."
          className="min-h-[80px]"
        />
      </div>

      {application.status === 'pending' && (
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={() => onStatusUpdate('approved', notes)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <UserCheck className="w-4 h-4 ml-2" />
            قبول
          </Button>
          <Button
            onClick={() => onStatusUpdate('rejected', notes)}
            variant="destructive"
            className="flex-1"
          >
            <UserX className="w-4 h-4 ml-2" />
            رفض
          </Button>
        </div>
      )}
    </div>
  );
};

const ProviderApplicationsManagement = () => {
  const { data: applications = [], isLoading } = useProviderApplications();
  const updateStatus = useUpdateApplicationStatus();
  const { toast } = useToast();

  const handleStatusUpdate = async (applicationId: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      await updateStatus.mutateAsync({ id: applicationId, status, admin_notes: notes });
      toast({
        title: status === 'approved' ? 'تم قبول الطلب' : 'تم رفض الطلب',
        description: 'تم تحديث حالة الطلب بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة الطلب',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'مقبول';
      case 'rejected': return 'مرفوض';
      default: return 'قيد المراجعة';
    }
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>طلبات الانضمام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>طلبات الانضمام كمقدم خدمة</span>
          {pendingCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {pendingCount} طلب جديد
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد طلبات انضمام حالياً
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{application.full_name}</h3>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-4">
                      <span>{application.service_types?.name}</span>
                      <span>•</span>
                      <span>{application.cities?.name}</span>
                      <span>•</span>
                      <PhoneDisplay phone={application.phone} />
                    </div>
                    <div className="text-xs text-gray-500">
                      تاريخ التقديم: {new Date(application.created_at).toLocaleDateString('ar-MA')}
                    </div>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>تفاصيل طلب الانضمام</DialogTitle>
                    </DialogHeader>
                    <ApplicationDetails
                      application={application}
                      onStatusUpdate={(status, notes) => handleStatusUpdate(application.id, status, notes)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderApplicationsManagement;
