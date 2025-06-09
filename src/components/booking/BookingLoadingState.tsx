
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BookingLoadingState = () => {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="border-blue-100 shadow-xl">
          <CardContent className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingLoadingState;
