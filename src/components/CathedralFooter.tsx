
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
import { cn } from '@/lib/utils';

const CathedralFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: 'الخدمات',
      links: [
        { name: 'تنظيف منزلي', href: '/providers' },
        { name: 'سباكة', href: '/providers' },
        { name: 'كهرباء', href: '/providers' },
        { name: 'دهان وتشطيب', href: '/providers' },
        { name: 'صيانة عامة', href: '/providers' },
      ]
    },
    {
      title: 'الشركة',
      links: [
        { name: 'من نحن', href: '#' },
        { name: 'كيف نعمل', href: '#' },
        { name: 'انضم كمعلم', href: '#' },
        { name: 'المدونة', href: '#' },
        { name: 'الأسئلة الشائعة', href: '#' },
      ]
    },
    {
      title: 'الدعم',
      links: [
        { name: 'مركز المساعدة', href: '#' },
        { name: 'اتصل بنا', href: '#' },
        { name: 'سياسة الخصوصية', href: '#' },
        { name: 'شروط الاستخدام', href: '#' },
        { name: 'ضمان الجودة', href: '#' },
      ]
    }
  ];

  const socialIcons = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section - Black hole for emails */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 space-x-reverse mb-6">
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                كن أول من يعرف
              </h2>
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              احصل على أحدث العروض والخدمات الجديدة مباشرة في بريدك الإلكتروني
              <br />
              <span className="text-blue-300 text-lg italic">نعدك بعدم الإزعاج، فقط المحتوى المفيد 💎</span>
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex space-x-3 space-x-reverse">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm"
                  required
                />
                <Button 
                  type="submit"
                  className={cn(
                    "px-6 transition-all duration-300",
                    isSubscribed 
                      ? "bg-emerald-600 hover:bg-emerald-700" 
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                  )}
                >
                  {isSubscribed ? (
                    <Heart className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {isSubscribed && (
                <p className="mt-3 text-emerald-400 text-sm animate-fade-in">
                  ✨ شكراً لك! تم التسجيل بنجاح
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Main Footer Content - Sacred Geometry Layout */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Logo size="lg" variant="monochrome" className="text-white" />
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                منصة رائدة في ربط العملاء بأفضل مقدمي الخدمات المنزلية في المغرب.
                نؤمن بالجودة والثقة والاحترافية.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>الدار البيضاء، المغرب</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+212 666 777 888</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>info@lmaalem.ma</span>
                </div>
              </div>
              
              {/* Social Icons with ethereal light */}
              <div className="flex space-x-4 space-x-reverse pt-4">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={cn(
                      "group p-3 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110",
                      social.color
                    )}
                  >
                    <social.icon className="w-5 h-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Navigation Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-bold text-white relative">
                  {section.title}
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                      >
                        <span className="relative">
                          {link.name}
                          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Elegant micro-copy */}
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
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                سياسة الخصوصية
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                شروط الاستخدام
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                ملفات تعريف الارتباط
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom ethereal glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </footer>
  );
};

export default CathedralFooter;
