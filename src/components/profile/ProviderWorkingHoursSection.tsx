
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import WorkingHoursCard from '@/components/WorkingHoursCard';

interface WorkingHour {
  available: boolean;
  start: string;
  end: string;
}

interface WorkingHours {
  monday: WorkingHour;
  tuesday: WorkingHour;
  wednesday: WorkingHour;
  thursday: WorkingHour;
  friday: WorkingHour;
  saturday: WorkingHour;
  sunday: WorkingHour;
}

interface ProviderWorkingHoursSectionProps {
  workingHours?: unknown;
}

const ProviderWorkingHoursSection = ({ workingHours }: ProviderWorkingHoursSectionProps) => {
  if (!workingHours || typeof workingHours !== 'object' || Array.isArray(workingHours)) {
    return null;
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
          <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span>أوقات العمل</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WorkingHoursCard workingHours={workingHours as unknown as WorkingHours} />
      </CardContent>
    </Card>
  );
};

export default ProviderWorkingHoursSection;
