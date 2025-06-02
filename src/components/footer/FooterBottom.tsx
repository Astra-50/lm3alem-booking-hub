
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const FooterBottom = () => {
  return (
    <div className="py-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-gray-400 text-sm">
          © 2024 لمعلم. جميع الحقوق محفوظة.
          <span className="mx-2">•</span>
          صُنع بـ 
          <Heart className="inline w-4 h-4 mx-1 text-red-400" />
          في المغرب
        </div>
        
        <div className="flex space-x-6 space-x-reverse text-sm">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
            سياسة الخصوصية
          </Link>
          <Link to="/terms-of-use" className="text-gray-400 hover:text-white transition-colors duration-300">
            شروط الاستخدام
          </Link>
          <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
            ملفات تعريف الارتباط
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
