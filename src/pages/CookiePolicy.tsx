
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings, BarChart, Shield } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Cookie className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                سياسة ملفات تعريف الارتباط
              </CardTitle>
              <p className="text-gray-600 mt-2">
                كيف نستخدم ملفات تعريف الارتباط لتحسين تجربتك
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">ما هي ملفات تعريف الارتباط؟</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة موقعنا. 
                    تساعدنا هذه الملفات في تذكر تفضيلاتك وتحسين تجربة استخدامك للمنصة.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">أنواع ملفات تعريف الارتباط التي نستخدمها</h2>
                </div>
                <div className="text-gray-700 space-y-6">
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">ملفات ضرورية</h3>
                    <p className="text-blue-700">
                      هذه الملفات ضرورية لعمل الموقع بشكل صحيح. تشمل ملفات تعريف الجلسة والأمان 
                      التي تسمح لك بالتنقل في الموقع واستخدام ميزاته الأساسية.
                    </p>
                    <ul className="list-disc list-inside mt-3 text-blue-700">
                      <li>ملفات تعريف الجلسة</li>
                      <li>ملفات الأمان والحماية</li>
                      <li>ملفات حفظ التفضيلات الأساسية</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">ملفات وظيفية</h3>
                    <p className="text-green-700">
                      تساعدنا في تذكر اختياراتك وتفضيلاتك لتقديم تجربة مخصصة وأكثر ملاءمة.
                    </p>
                    <ul className="list-disc list-inside mt-3 text-green-700">
                      <li>تذكر المدينة المختارة</li>
                      <li>حفظ تفضيلات اللغة</li>
                      <li>تذكر آخر البحوث</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">ملفات تحليلية</h3>
                    <p className="text-purple-700">
                      تساعدنا في فهم كيفية استخدام الزوار للموقع لتحسين الخدمات وتطوير المنصة.
                    </p>
                    <ul className="list-disc list-inside mt-3 text-purple-700">
                      <li>إحصائيات الزيارات</li>
                      <li>تتبع الصفحات الأكثر استخداماً</li>
                      <li>قياس أداء المنصة</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">كيف نستخدم ملفات تعريف الارتباط</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>تحسين تجربة التصفح وسرعة تحميل الصفحات</li>
                    <li>تذكر تفضيلاتك مثل المدينة ونوع الخدمة المفضل</li>
                    <li>تقديم محتوى مخصص بناءً على اهتماماتك</li>
                    <li>حماية حسابك والحفاظ على أمان جلستك</li>
                    <li>جمع إحصائيات مجهولة لتحسين الخدمات</li>
                    <li>منع الاستخدام غير المشروع للمنصة</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">التحكم في ملفات تعريف الارتباط</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <p>يمكنك التحكم في ملفات تعريف الارتباط بالطرق التالية:</p>
                  
                  <h3 className="text-xl font-semibold mt-6">إعدادات المتصفح:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>تعطيل ملفات تعريف الارتباط كلياً أو جزئياً</li>
                    <li>حذف ملفات تعريف الارتباط الموجودة</li>
                    <li>تلقي تنبيه عند إنشاء ملفات جديدة</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">تفضيلات المنصة:</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>يمكنك تعديل تفضيلاتك في إعدادات الحساب</li>
                    <li>اختيار أنواع الإشعارات التي تريد تلقيها</li>
                    <li>إلغاء الاشتراك في الرسائل التسويقية</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">ملفات الطرف الثالث</h2>
                <div className="text-gray-700 space-y-4">
                  <p>قد نستخدم خدمات طرف ثالث موثوقة لتحسين المنصة، مثل:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>Google Analytics لتحليل حركة المرور</li>
                    <li>خدمات الخرائط لتحديد المواقع</li>
                    <li>أدوات الأمان ومنع الاحتيال</li>
                  </ul>
                  <p className="mt-4">
                    هذه الخدمات لها سياساتها الخاصة لملفات تعريف الارتباط، ننصحك بمراجعتها.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">تأثير تعطيل ملفات تعريف الارتباط</h2>
                <div className="text-gray-700 space-y-4">
                  <p>إذا اخترت تعطيل ملفات تعريف الارتباط، فقد تواجه:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>صعوبة في تذكر تفضيلاتك</li>
                    <li>الحاجة لإعادة إدخال معلوماتك في كل زيارة</li>
                    <li>تجربة أقل تخصيصاً</li>
                    <li>بعض الميزات قد لا تعمل بشكل صحيح</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">الاتصال بنا</h2>
                <div className="text-gray-700">
                  <p>
                    إذا كان لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، 
                    يرجى التواصل معنا عبر قنوات الاتصال المتاحة على الموقع.
                  </p>
                </div>
              </section>

              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800 font-medium">
                  آخر تحديث: {new Date().toLocaleDateString('ar-MA')}
                </p>
                <p className="text-green-700 text-sm mt-2">
                  نقوم بمراجعة وتحديث سياسة ملفات تعريف الارتباط بانتظام لضمان الشفافية والامتثال للقوانين.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
