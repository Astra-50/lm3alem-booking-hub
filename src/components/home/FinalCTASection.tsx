
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Play } from 'lucide-react';

const FinalCTASection = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/providers');
  };

  return (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">جاهز لتجربة الأفضل؟</h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
          انضم إلى آلاف العملاء الذين اختاروا الجودة والاحترافية
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:justify-center">
          <Button 
            onClick={handleSearch}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-10 py-6 h-16 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
          >
            <Zap className="w-6 h-6 mr-3" />
            ابدأ الآن مجاناً
          </Button>
          
          <Button 
            variant="outline"
            size="lg" 
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-10 py-6 h-16 rounded-xl font-bold transition-all duration-300"
          >
            <Play className="w-6 h-6 mr-3" />
            شاهد كيف يعمل
          </Button>
        </div>
        
        <p className="text-blue-200 mt-8 text-lg">
          🔒 آمن ومضمون • ⚡ استجابة فورية • 💯 رضا مضمون
        </p>
      </div>
    </div>
  );
};

export default FinalCTASection;
