
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <span className="text-2xl font-bold text-primary">لمعلم</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/providers" className="text-gray-700 hover:text-primary transition-colors">
              مقدمو الخدمات
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
