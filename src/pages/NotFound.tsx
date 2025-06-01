
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="py-16 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              404
            </div>
            <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-blue-600/10 animate-ping">
              404
            </div>
          </div>

          {/* Arabic Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            عذراً، الصفحة غير موجودة
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها.
            <br />
            لا تقلق، يمكننا مساعدتك في العثور على ما تحتاجه!
          </p>

          {/* Suggested Actions */}
          <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">ماذا يمكنك فعله؟</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-800">العودة للرئيسية</span>
                </div>
                <p className="text-sm text-gray-600">
                  ابدأ من جديد واستكشف خدماتنا
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-800">تصفح المعلمين</span>
                </div>
                <p className="text-sm text-gray-600">
                  ابحث عن مقدمي الخدمات في مدينتك
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link to="/" className="flex items-center space-x-2 space-x-reverse">
                <Home className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400">
              <Link to="/providers" className="flex items-center space-x-2 space-x-reverse">
                <Search className="w-5 h-5" />
                <span>تصفح المعلمين</span>
              </Link>
            </Button>
          </div>

          {/* Fun Error Details */}
          <div className="mt-12 text-sm text-gray-500">
            <p>رابط الصفحة المفقودة: <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">{location.pathname}</code></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
