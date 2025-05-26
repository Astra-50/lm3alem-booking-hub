
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

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

interface WorkingHoursCardProps {
  workingHours: WorkingHours;
}

const dayNames = {
  monday: 'الاثنين',
  tuesday: 'الثلاثاء',
  wednesday: 'الأربعاء',
  thursday: 'الخميس',
  friday: 'الجمعة',
  saturday: 'السبت',
  sunday: 'الأحد'
};

const WorkingHoursCard = ({ workingHours }: WorkingHoursCardProps) => {
  const formatTime = (time: string) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('ar-MA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">ساعات العمل</h2>
        </div>
        
        <div className="space-y-3">
          {Object.entries(dayNames).map(([dayKey, dayName]) => {
            const day = dayKey as keyof WorkingHours;
            const isToday = dayKey === currentDay;
            const schedule = workingHours[day];
            
            return (
              <div 
                key={day} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isToday ? 'bg-primary/5 border-primary/20' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isToday ? 'text-primary' : 'text-gray-700'}`}>
                    {dayName}
                  </span>
                  {isToday && (
                    <Badge variant="outline" className="text-xs">
                      اليوم
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {schedule.available ? (
                    <>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        متاح
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {formatTime(schedule.start)} - {formatTime(schedule.end)}
                      </span>
                    </>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      غير متاح
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {workingHours[currentDay as keyof WorkingHours]?.available && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✅ متاح اليوم من {formatTime(workingHours[currentDay as keyof WorkingHours].start)} 
              إلى {formatTime(workingHours[currentDay as keyof WorkingHours].end)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkingHoursCard;
