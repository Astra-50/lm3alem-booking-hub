
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeFieldsProps {
  date: string;
  time: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

const DateTimeFields = ({ date, time, onChange, disabled }: DateTimeFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <Label htmlFor="date" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>التاريخ المطلوب <span className="text-red-500">*</span></span>
        </Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => onChange('date', e.target.value)}
          className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
          required
          disabled={disabled}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="time" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>الوقت المطلوب <span className="text-red-500">*</span></span>
        </Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => onChange('time', e.target.value)}
          className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DateTimeFields;
