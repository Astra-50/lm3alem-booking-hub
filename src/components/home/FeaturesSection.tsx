
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Heart, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "معلمون مُتحققون 100%",
      description: "جميع مقدمي الخدمات تم التحقق من هويتهم وخبرتهم بعناية فائقة",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Zap,
      title: "استجابة فورية",
      description: "احصل على رد خلال دقائق من أفضل المعلمين في منطقتك",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Heart,
      title: "رضا مضمون",
      description: "نضمن جودة الخدمة أو نعيد لك أموالك كاملة",
      color: "text-rose-500",
      bgColor: "bg-rose-50"
    },
    {
      icon: Award,
      title: "أفضل الأسعار",
      description: "أسعار عادلة وشفافة بدون رسوم خفية أو مفاجآت",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">لماذا نحن الأفضل؟</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          تجربة مُصممة بعناية لتقديم أفضل خدمة منزلية في المغرب
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="group text-center p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
