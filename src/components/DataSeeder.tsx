
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { seedDatabase } from '@/utils/seedData';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';

const DataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      setIsSeeded(true);
      toast({
        title: "نجح!",
        description: "تم إضافة البيانات التجريبية بنجاح",
        variant: "default",
      });
    } catch (error) {
      console.error('Seeding error:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة البيانات التجريبية",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 space-x-reverse">
          <Database className="w-5 h-5 text-blue-600" />
          <span>إضافة البيانات التجريبية</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          إضافة بيانات تجريبية تتضمن مدن مغربية، خدمات، أحياء، ومقدمي خدمات لاختبار التطبيق
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">البيانات التي ستتم إضافتها:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 8 مدن مغربية (الدار البيضاء، الرباط، سلا، فاس...)</li>
            <li>• 8 أنواع خدمات (تنظيف، سباكة، كهرباء، دهان...)</li>
            <li>• 12 حي في المدن الرئيسية</li>
            <li>• 6 مقدمي خدمات متحققين</li>
          </ul>
        </div>

        <Button 
          onClick={handleSeedData}
          disabled={isSeeding || isSeeded}
          className="w-full"
          variant={isSeeded ? "outline" : "default"}
        >
          {isSeeding ? (
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>جاري الإضافة...</span>
            </div>
          ) : isSeeded ? (
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>تم إضافة البيانات</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Database className="w-4 h-4" />
              <span>إضافة البيانات التجريبية</span>
            </div>
          )}
        </Button>

        {!isSeeded && (
          <div className="flex items-start space-x-2 space-x-reverse text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              تأكد من اتصال قاعدة البيانات قبل إضافة البيانات التجريبية
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSeeder;
