
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "أحمد المرابط",
      title: "مهندس برمجيات",
      city: "الرباط",
      service: "تنظيف",
      rating: 5,
      comment: "لم أكن أتوقع هذا المستوى من الاحترافية! معلم وصل في الوقت المحدد ونظف منزلي بطريقة لا تصدق. الآن أصدقائي يسألونني عن سري في النظافة!",
      avatar: "أ",
      verified: true,
      timeAgo: "منذ أسبوع"
    },
    {
      id: 2,
      name: "فاطمة العلوي",
      title: "طبيبة أسنان",
      city: "الدار البيضاء",
      service: "سباكة",
      rating: 5,
      comment: "كان لدي تسريب في المطبخ لأسابيع. في 30 دقيقة فقط، حل المعلم المشكلة تماماً! الخدمة كانت سريعة ومهنية للغاية.",
      avatar: "ف",
      verified: true,
      timeAgo: "منذ 3 أيام"
    },
    {
      id: 3,
      name: "يوسف التازي",
      title: "صاحب مطعم",
      city: "سلا",
      service: "كهرباء",
      rating: 5,
      comment: "التطبيق سهل جداً والمعلمين محترفين. حجزت معلم كهرباء لمطعمي وكانت الخدمة أكثر من رائعة. أنصح الجميع!",
      avatar: "ي",
      verified: true,
      timeAgo: "منذ يومين"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">قصص نجاح حقيقية</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          اقرأ تجارب عملائنا الذين غيّرت خدماتنا حياتهم اليومية
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="group p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4 shadow-lg">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end mb-1">
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{testimonial.title}</p>
                  <p className="text-xs text-gray-500">{testimonial.city} • {testimonial.service} • {testimonial.timeAgo}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4 justify-end">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 text-right leading-relaxed text-lg">
                "{testimonial.comment}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
