
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                سياسة الخصوصية
              </CardTitle>
              <p className="text-gray-600 mt-2">
                نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">المعلومات التي نجمعها</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <p>نقوم بجمع المعلومات التالية لتقديم خدماتنا:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>المعلومات الشخصية: الاسم، رقم الهاتف، عنوان البريد الإلكتروني</li>
                    <li>معلومات الموقع: المدينة والحي لتوفير خدمات محلية</li>
                    <li>تفاصيل طلبات الخدمة: نوع الخدمة المطلوبة ووصف العمل</li>
                    <li>معلومات مقدمي الخدمات: الخبرة، المهارات، ساعات العمل</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">كيف نستخدم معلوماتك</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <p>نستخدم المعلومات المجمعة للأغراض التالية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>ربط العملاء بمقدمي الخدمات المناسبين في منطقتهم</li>
                    <li>تسهيل عملية الحجز والتواصل بين الطرفين</li>
                    <li>تحسين جودة الخدمات المقدمة على المنصة</li>
                    <li>إرسال إشعارات مهمة حول حالة طلبات الخدمة</li>
                    <li>حماية المنصة من الاستخدام غير المشروع</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-800">حماية البيانات</h2>
                </div>
                <div className="text-gray-700 space-y-4">
                  <p>نتخذ الإجراءات التالية لحماية بياناتك:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>تشفير جميع البيانات الحساسة أثناء النقل والتخزين</li>
                    <li>استخدام خوادم آمنة ومحمية بأحدث تقنيات الأمان</li>
                    <li>تقييد الوصول للبيانات على الموظفين المخولين فقط</li>
                    <li>مراجعة دورية لأنظمة الأمان والحماية</li>
                    <li>عدم مشاركة بياناتك مع أطراف ثالثة دون موافقتك</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">مشاركة المعلومات</h2>
                <div className="text-gray-700 space-y-4">
                  <p>نقوم بمشاركة معلوماتك فقط في الحالات التالية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>مع مقدمي الخدمات المختارين لتنفيذ طلبك</li>
                    <li>عندما يتطلب القانون المغربي ذلك</li>
                    <li>لحماية حقوقنا أو حقوق مستخدمين آخرين</li>
                    <li>مع موافقتك الصريحة المسبقة</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">حقوقك</h2>
                <div className="text-gray-700 space-y-4">
                  <p>لديك الحقوق التالية فيما يتعلق ببياناتك:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>الحق في الوصول إلى بياناتك الشخصية</li>
                    <li>الحق في تصحيح أو تحديث معلوماتك</li>
                    <li>الحق في حذف حسابك وبياناتك</li>
                    <li>الحق في سحب موافقتك في أي وقت</li>
                    <li>الحق في تقديم شكوى لدى السلطات المختصة</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">الاتصال بنا</h2>
                <div className="text-gray-700">
                  <p>
                    إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ترغب في ممارسة أي من حقوقك، 
                    يرجى الاتصال بنا عبر البريد الإلكتروني أو الهاتف المتوفر على موقعنا.
                  </p>
                </div>
              </section>

              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-800 font-medium">
                  آخر تحديث: {new Date().toLocaleDateString('ar-MA')}
                </p>
                <p className="text-blue-700 text-sm mt-2">
                  نحتفظ بالحق في تحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
