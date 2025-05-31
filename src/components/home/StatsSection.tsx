
import React from 'react';
import { Users, Shield, Heart, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: "2000+", label: "عميل سعيد", icon: Users },
    { number: "500+", label: "معلم موثوق", icon: Shield },
    { number: "98%", label: "معدل الرضا", icon: Heart },
    { number: "24/7", label: "دعم فني", icon: Clock }
  ];

  return (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">أرقام تتحدث عن نفسها</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            انضم إلى آلاف العملاء الذين اختاروا الأفضل
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100 text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
