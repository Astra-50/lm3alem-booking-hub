
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, MessageSquare } from 'lucide-react';

interface PersonalInfoFieldsProps {
  fullName: string;
  phone: string;
  whatsapp: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

const PersonalInfoFields = ({ fullName, phone, whatsapp, onChange, disabled }: PersonalInfoFieldsProps) => {
  return (
    <>
      {/* Full Name */}
      <div className="space-y-3">
        <Label htmlFor="fullName" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
          <User className="w-5 h-5 text-blue-600" />
          <span>الاسم الكامل <span className="text-red-500">*</span></span>
        </Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="أدخل اسمك الكامل"
          className="text-right h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50"
          required
          disabled={disabled}
        />
      </div>
      
      {/* Phone */}
      <div className="space-y-3">
        <Label htmlFor="phone" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
          <Phone className="w-5 h-5 text-blue-600" />
          <span>رقم الهاتف <span className="text-red-500">*</span></span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="0612345678"
          className="text-left h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50 font-mono"
          dir="ltr"
          required
          disabled={disabled}
        />
      </div>
      
      {/* WhatsApp */}
      <div className="space-y-3">
        <Label htmlFor="whatsapp" className="text-right flex items-center space-x-2 space-x-reverse text-lg font-medium">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <span>رقم واتساب (اختياري)</span>
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(e) => onChange('whatsapp', e.target.value)}
          placeholder="0612345678"
          className="text-left h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400/50 font-mono"
          dir="ltr"
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default PersonalInfoFields;
