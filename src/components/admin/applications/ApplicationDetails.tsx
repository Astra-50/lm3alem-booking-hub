
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Briefcase, Clock } from 'lucide-react';
import PhoneDisplay from '@/components/PhoneDisplay';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import ApplicationActions from './ApplicationActions';

interface ApplicationDetailsProps {
  application: any;
  onStatusUpdate: (status: 'approved' | 'rejected', notes?: string) => void;
}

const ApplicationDetails = ({ application, onStatusUpdate }: ApplicationDetailsProps) => {
  const [notes, setNotes] = useState(application.admin_notes || '');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{application.full_name}</h3>
        <ApplicationStatusBadge status={application.status} />
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

      <ApplicationActions
        status={application.status}
        onApprove={() => onStatusUpdate('approved', notes)}
        onReject={() => onStatusUpdate('rejected', notes)}
      />
    </div>
  );
};

export default ApplicationDetails;
