
import React from 'react';
import { Link } from 'react-router-dom';

const FooterNavigation = () => {
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
        { name: 'من نحن', href: '/' },
        { name: 'كيف نعمل', href: '/' },
        { name: 'انضم كمعلم', href: '/join-provider' },
        { name: 'المدونة', href: '/' },
        { name: 'الأسئلة الشائعة', href: '/' },
      ]
    },
    {
      title: 'الدعم',
      links: [
        { name: 'مركز المساعدة', href: '/' },
        { name: 'اتصل بنا', href: '/' },
        { name: 'سياسة الخصوصية', href: '/privacy-policy' },
        { name: 'شروط الاستخدام', href: '/terms-of-use' },
        { name: 'ضمان الجودة', href: '/' },
      ]
    }
  ];

  return (
    <>
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
    </>
  );
};

export default FooterNavigation;
