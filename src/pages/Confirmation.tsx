
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MessageCircle, Home, ArrowRight } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const state = location.state as { providerName?: string; providerPhone?: string } | null;
  
  const whatsappMessage = encodeURIComponent('أنا مهتم بحجز خدمتكم');
  const whatsappUrl = state?.providerPhone 
    ? `https://wa.me/${state.providerPhone.replace(/\D/g, '')}?text=${whatsappMessage}`
    : null;

  return (
    <Layout>
      <div className="py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-100 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                تم إرسال طلبك بنجاح!
              </CardTitle>
              <p className="text-gray-600 text-lg mt-2">
                شكراً لك على ثقتك بخدماتنا
              </p>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              <div className="text-center">
                <p className="text-gray-700 text-lg leading-relaxed">
                  تم استلام طلب الحجز الخاص بك بنجاح.
                  {state?.providerName && (
                    <><br />سيتواصل معك <span className="font-semibold text-blue-600">{state.providerName}</span> قريباً.</>
                  )}
                </p>
              </div>
              
              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">ما الخطوة التالية؟</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                    <p className="text-gray-700">سيتم مراجعة طلبك من قبل فريقنا</p>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                    <p className="text-gray-700">سيتواصل معك مقدم الخدمة خلال 24 ساعة</p>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                    <p className="text-gray-700">يمكنك أيضاً التواصل مباشرة عبر واتساب</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                      <MessageCircle className="w-5 h-5 ml-2" />
                      تواصل عبر واتساب
                    </Button>
                  </a>
                )}
                
                <Button 
                  variant="outline" 
                  asChild 
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 w-full sm:w-auto"
                >
                  <Link to="/" className="flex items-center space-x-2 space-x-reverse">
                    <Home className="w-5 h-5" />
                    <span>العودة إلى الصفحة الرئيسية</span>
                  </Link>
                </Button>
              </div>

              {/* Additional Support */}
              <div className="text-center pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-4">
                  هل تحتاج مساعدة إضافية؟
                </p>
                <Button variant="ghost" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Link to="/providers" className="flex items-center space-x-2 space-x-reverse">
                    <span>تصفح المزيد من المعلمين</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
