
import React from 'react';
import { Button } from '@/components/ui/button';

interface BookingSubmitButtonProps {
  isLoading: boolean;
}

const BookingSubmitButton = ({ isLoading }: BookingSubmitButtonProps) => {
  return (
    <>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-4 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>جاري الإرسال...</span>
          </div>
        ) : (
          'إرسال طلب الحجز'
        )}
      </Button>
      
      <p className="text-sm text-gray-600 text-center bg-blue-50 p-4 rounded-xl">
        <span className="font-medium">ملاحظة:</span> بإرسال هذا النموذج، أنت توافق على السماح لمقدم الخدمة بالتواصل معك
      </p>
    </>
  );
};

export default BookingSubmitButton;
