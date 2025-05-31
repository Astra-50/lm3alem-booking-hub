
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PopularServicesSection = () => {
  const popularServices = [
    { name: "تنظيف", icon: "🧹", color: "from-blue-500 to-blue-600", requests: "1200+ طلب" },
    { name: "سباكة", icon: "🔧", color: "from-green-500 to-green-600", requests: "800+ طلب" },
    { name: "كهرباء", icon: "⚡", color: "from-yellow-500 to-yellow-600", requests: "650+ طلب" },
    { name: "دهان", icon: "🎨", color: "from-purple-500 to-purple-600", requests: "400+ طلب" },
    { name: "نجارة", icon: "🔨", color: "from-orange-500 to-orange-600", requests: "350+ طلب" },
    { name: "تكييف", icon: "❄️", color: "from-cyan-500 to-cyan-600", requests: "300+ طلب" }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">الخدمات الأكثر طلباً</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          اختر من أشهر الخدمات التي يثق بها آلاف العملاء يومياً
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {popularServices.map((service, index) => (
          <Card key={index} className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:scale-105 overflow-hidden">
            <CardContent className="p-0">
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{service.requests}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularServicesSection;
