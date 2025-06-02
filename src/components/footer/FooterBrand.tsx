
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from '../Logo';
import { cn } from '@/lib/utils';

const FooterBrand = () => {
  const socialIcons = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  ];

  return (
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
  );
};

export default FooterBrand;
