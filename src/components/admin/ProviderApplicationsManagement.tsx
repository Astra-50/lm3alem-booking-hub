
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProviderApplications, useUpdateApplicationStatus } from '@/hooks/useProviderApplications';
import { useToast } from '@/hooks/use-toast';
import ApplicationCard from './applications/ApplicationCard';

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
              <ApplicationCard
                key={application.id}
                application={application}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderApplicationsManagement;
