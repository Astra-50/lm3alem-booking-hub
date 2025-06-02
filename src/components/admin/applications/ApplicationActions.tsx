
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserCheck, UserX } from 'lucide-react';

interface ApplicationActionsProps {
  status: string;
  onApprove: () => void;
  onReject: () => void;
}

const ApplicationActions = ({ status, onApprove, onReject }: ApplicationActionsProps) => {
  if (status !== 'pending') {
    return null;
  }

  return (
    <div className="flex gap-3 pt-4 border-t">
      <Button
        onClick={onApprove}
        className="flex-1 bg-green-600 hover:bg-green-700"
      >
        <UserCheck className="w-4 h-4 ml-2" />
        قبول
      </Button>
      <Button
        onClick={onReject}
        variant="destructive"
        className="flex-1"
      >
        <UserX className="w-4 h-4 ml-2" />
        رفض
      </Button>
    </div>
  );
};

export default ApplicationActions;
