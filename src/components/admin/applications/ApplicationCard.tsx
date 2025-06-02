
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import PhoneDisplay from '@/components/PhoneDisplay';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import ApplicationDetails from './ApplicationDetails';

interface ApplicationCardProps {
  application: any;
  onStatusUpdate: (applicationId: string, status: 'approved' | 'rejected', notes?: string) => void;
}

const ApplicationCard = ({ application, onStatusUpdate }: ApplicationCardProps) => {
  const handleStatusUpdate = (status: 'approved' | 'rejected', notes?: string) => {
    onStatusUpdate(application.id, status, notes);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-medium">{application.full_name}</h3>
          <ApplicationStatusBadge status={application.status} />
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
            onStatusUpdate={handleStatusUpdate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationCard;
