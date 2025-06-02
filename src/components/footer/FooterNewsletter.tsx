
import React, { useState } from 'react';
import { ArrowRight, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const FooterNewsletter = () => {
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

  return (
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
  );
};

export default FooterNewsletter;
