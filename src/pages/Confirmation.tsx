
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Confirmation = () => {
  const location = useLocation();
  const state = location.state as { providerName?: string; providerPhone?: string } | null;
  
  const whatsappMessage = encodeURIComponent('أنا مهتم بحجز خدمتكم');
  const whatsappUrl = state?.providerPhone 
    ? `https://wa.me/${state.providerPhone.replace(/\D/g, '')}?text=${whatsappMessage}`
    : null;

  return (
    <Layout>
      <Header />
      
      <div className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <CardTitle className="text-2xl text-green-600">تم إرسال طلبك بنجاح!</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-lg">
                شكراً لك! تم استلام طلب الحجز الخاص بك.
                {state?.providerName && ` سيتواصل معك ${state.providerName} قريباً.`}
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">ما الخطوة التالية؟</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-right">
                  <li>• سيتم مراجعة طلبك من قبل فريقنا</li>
                  <li>• سيتواصل معك مقدم الخدمة خلال 24 ساعة</li>
                  <li>• يمكنك أيضاً التواصل مباشرة عبر واتساب</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      📱 تواصل عبر واتساب
                    </Button>
                  </a>
                )}
                
                <Link to="/">
                  <Button variant="outline">
                    العودة إلى الصفحة الرئيسية
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
