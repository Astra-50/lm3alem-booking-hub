
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ApplicationStatusBadgeProps {
  status: string;
}

const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
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
    <Badge className={getStatusColor(status)}>
      {getStatusText(status)}
    </Badge>
  );
};

export default ApplicationStatusBadge;
