
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Confirmation = () => {
  const providerName = "أحمد الصالحي"; // In real app, this would come from state/params
  const whatsappNumber = "+212612345678";

  return (
    <Layout>
      <Header />
      
      <div className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              {/* Success Icon */}
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              
              {/* Success Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                تم إرسال طلبك بنجاح!
              </h1>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-right">
                <p className="text-lg text-green-800 leading-relaxed">
                  تم إرسال طلبك إلى <strong>{providerName}</strong>. 
                  سيتواصل معك قريباً عبر الهاتف أو واتساب لتأكيد الموعد ومناقشة التفاصيل.
                </p>
              </div>
              
              <div className="text-gray-600 mb-8">
                <p className="mb-2">⏰ عادة ما يتم الرد خلال ساعة واحدة</p>
                <p>📱 تأكد من أن هاتفك متاح لاستقبال المكالمات</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=مرحباً، لقد قمت بإرسال طلب حجز عبر منصة معلم`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <span className="ml-2">📱</span>
                  تواصل عبر واتساب
                </a>
                
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    رجوع إلى الصفحة الرئيسية
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  شكراً لاستخدامك <strong>معلم</strong> - منصة الخدمات المحلية الموثوقة
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
