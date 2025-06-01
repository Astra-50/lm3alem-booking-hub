
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DescriptionFieldProps {
  description: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

const DescriptionField = ({ description, onChange, disabled }: DescriptionFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="description" className="text-right text-lg font-medium">
        وصف العمل المطلوب
      </Label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="صف العمل الذي تحتاجه بالتفصيل..."
        className="text-right min-h-[120px] border-blue-200 focus:border-blue-400 focus:ring-blue-400/50 resize-none"
        rows={5}
        disabled={disabled}
      />
    </div>
  );
};

export default DescriptionField;
