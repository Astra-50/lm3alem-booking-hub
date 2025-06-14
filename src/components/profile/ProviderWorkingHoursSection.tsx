
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
      <CardHeader className="pb-2 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-base md:text-lg">
          <Clock className="w-4 h-4 text-primary flex-shrink-0" />
          <span>أوقات العمل</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
        <WorkingHoursCard workingHours={workingHours as unknown as WorkingHours} />
      </CardContent>
    </Card>
  );
};

export default ProviderWorkingHoursSection;
