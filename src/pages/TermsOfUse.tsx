
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Shield, AlertTriangle } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                شروط الاستخدام
              </CardTitle>
              <p className="text-gray-600 mt-2">
                الأحكام والشروط لاستخدام منصة معلم
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">مقدمة</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    مرحباً بك في منصة "معلم" - منصة ربط العملاء بمقدمي الخدمات المنزلية والمهنية في المغرب. 
                    باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">تعريف المستخدمين</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <h3 className="text-xl font-semibold">العملاء:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>الأشخاص الذين يبحثون عن خدمات منزلية أو مهنية</li>
                    <li>يحق لهم تصفح المنصة وحجز الخدمات</li>
                    <li>يجب عليهم تقديم معلومات صحيحة عند الحجز</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">مقدمو الخدمات (المعلمون):</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>المهنيون المتخصصون في تقديم خدمات منزلية ومهنية</li>
                    <li>يجب أن يكونوا حاصلين على التراخيص اللازمة لعملهم</li>
                    <li>ملزمون بتقديم خدمات عالية الجودة</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">قواعد الاستخدام</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <h3 className="text-xl font-semibold">للعملاء:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>استخدام المنصة للأغراض المشروعة فقط</li>
                    <li>تقديم معلومات دقيقة وصحيحة عند الحجز</li>
                    <li>التعامل بأدب واحترام مع مقدمي الخدمات</li>
                    <li>دفع رسوم الخدمات المتفق عليها</li>
                    <li>إلغاء الحجوزات في وقت مناسب</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">لمقدمي الخدمات:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>تقديم خدمات عالية الجودة وفي الوقت المحدد</li>
                    <li>الحفاظ على سرية معلومات العملاء</li>
                    <li>احترام ممتلكات العملاء</li>
                    <li>التواصل المهني والمؤدب مع العملاء</li>
                    <li>تحديث معلومات التوفر بانتظام</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">المسؤوليات والضمانات</h2>
                <div className="text-gray-700 space-y-4">
                  <h3 className="text-xl font-semibold">مسؤولية المنصة:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>توفير منصة آمنة وموثوقة للربط بين الطرفين</li>
                    <li>التحقق من هوية مقدمي الخدمات قدر الإمكان</li>
                    <li>حل النزاعات بعدالة وشفافية</li>
                    <li>حماية البيانات الشخصية للمستخدمين</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">إخلاء المسؤولية:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>المنصة وسيط بين العملاء ومقدمي الخدمات</li>
                    <li>لا نتحمل المسؤولية عن جودة الخدمات المقدمة</li>
                    <li>التعاملات المالية تتم مباشرة بين الطرفين</li>
                    <li>أي أضرار أو خسائر تقع على مسؤولية الأطراف المعنية</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">الدفع والرسوم</h2>
                <div className="text-gray-700 space-y-4">
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>الحجز عبر المنصة مجاني للعملاء</li>
                    <li>الدفع يتم مباشرة لمقدم الخدمة</li>
                    <li>الأسعار يحددها مقدمو الخدمات</li>
                    <li>يفضل الاتفاق على السعر قبل بدء العمل</li>
                    <li>في حالة النزاع، يرجى التواصل مع إدارة المنصة</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-gray-800">السلوك المحظور</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <p>يحظر على جميع المستخدمين:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>استخدام المنصة لأغراض غير قانونية</li>
                    <li>انتحال الشخصية أو تقديم معلومات مزيفة</li>
                    <li>التحايل على نظام المنصة أو محاولة اختراقها</li>
                    <li>التحرش أو السلوك غير المهذب</li>
                    <li>نشر محتوى مخالف للآداب العامة</li>
                    <li>استخدام المنصة للتنافس مع أعمالنا</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">إنهاء الحساب</h2>
                <div className="text-gray-700 space-y-4">
                  <p>يحق لنا إنهاء أو تعليق حساب أي مستخدم في الحالات التالية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>انتهاك هذه الشروط والأحكام</li>
                    <li>استخدام المنصة لأغراض احتيالية</li>
                    <li>تلقي شكاوى متكررة ومبررة</li>
                    <li>عدم النشاط لفترة طويلة (أكثر من سنة)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">القانون المطبق</h2>
                <div className="text-gray-700">
                  <p>
                    تخضع هذه الشروط والأحكام للقانون المغربي. أي نزاع ينشأ عن استخدام المنصة 
                    سيتم حله وفقاً للقوانين المعمول بها في المملكة المغربية.
                  </p>
                </div>
              </section>

              <div className="bg-amber-50 p-6 rounded-lg">
                <p className="text-amber-800 font-medium">
                  آخر تحديث: {new Date().toLocaleDateString('ar-MA')}
                </p>
                <p className="text-amber-700 text-sm mt-2">
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات تصبح سارية فور نشرها على الموقع.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
