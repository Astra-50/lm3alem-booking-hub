
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <span className="text-2xl font-bold text-primary">لمعلم</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/providers" className="text-gray-700 hover:text-primary transition-colors">
              مقدمو الخدمات
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors">
                <Menu size={24} />
                <span className="sr-only">فتح القائمة</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  className="text-lg text-gray-700 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100"
                  onClick={closeSheet}
                >
                  الرئيسية
                </Link>
                <Link 
                  to="/providers" 
                  className="text-lg text-gray-700 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100"
                  onClick={closeSheet}
                >
                  مقدمو الخدمات
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
