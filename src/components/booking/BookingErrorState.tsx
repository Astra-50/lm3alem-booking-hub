
import React from 'react';
import { Button } from '@/components/ui/button';

interface BookingErrorStateProps {
  onReturnToProviders: () => void;
}

const BookingErrorState = ({ onReturnToProviders }: BookingErrorStateProps) => {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="text-red-600 text-5xl mb-4">❌</div>
          <h3 className="text-xl font-bold text-red-800 mb-4">لم يتم العثور على مقدم الخدمة</h3>
          <Button 
            onClick={onReturnToProviders}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            العودة إلى قائمة مقدمي الخدمات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingErrorState;
