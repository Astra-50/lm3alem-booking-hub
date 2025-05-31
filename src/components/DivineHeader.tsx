
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Logo from './Logo';
import { cn } from '@/lib/utils';

const DivineHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'الرئيسية', href: '/', current: location.pathname === '/' },
    { name: 'مقدمو الخدمات', href: '/providers', current: location.pathname === '/providers' },
  ];

  const services = [
    { name: 'تنظيف منزلي', description: 'خدمات تنظيف احترافية' },
    { name: 'سباكة', description: 'إصلاح وصيانة السباكة' },
    { name: 'كهرباء', description: 'خدمات كهربائية آمنة' },
    { name: 'دهان', description: 'دهان وتشطيب المنازل' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-500/10 border-b border-blue-100/50" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with gravitational precision */}
          <Link to="/" className="group">
            <Logo 
              size="md" 
              variant={isScrolled ? 'default' : 'default'}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Desktop Navigation - Silk under neutrino beam */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6 space-x-reverse">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link to={item.href}>
                      <NavigationMenuLink className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        item.current 
                          ? "text-blue-600 bg-blue-50" 
                          : "text-gray-700 hover:text-blue-600"
                      )}>
                        {item.name}
                        <div className={cn(
                          "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full",
                          item.current && "w-full"
                        )}></div>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Mega Menu for Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    الخدمات
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-96 bg-white/95 backdrop-blur-xl border border-blue-100 shadow-2xl shadow-blue-500/20 rounded-2xl">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-blue-500 to-purple-600 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              جميع الخدمات
                            </div>
                            <p className="text-sm leading-tight text-blue-100">
                              اكتشف مجموعة واسعة من الخدمات المنزلية الموثوقة
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </div>
                      {services.map((service) => (
                        <NavigationMenuLink key={service.name} asChild>
                          <Link
                            to="/providers"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">{service.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTAs with biologically irresistible persuasion */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <Button 
              variant="ghost" 
              asChild
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              <Link to="/providers">تصفح المعلمين</Link>
            </Button>
            
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/providers">ابدأ الآن</Link>
            </Button>
          </div>

          {/* Mobile hamburger - quantum flower */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden relative w-10 h-10 rounded-full hover:bg-blue-50 transition-all duration-300"
              >
                <div className="relative w-6 h-6">
                  <Menu 
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    )} 
                  />
                  <X 
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                    )} 
                  />
                </div>
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-80 bg-white/95 backdrop-blur-xl border-l border-blue-100"
            >
              <div className="flex flex-col space-y-6 mt-8">
                <Logo size="lg" className="self-center" />
                
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-600",
                        item.current ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="px-4 text-sm font-medium text-gray-500 mb-3">الخدمات</h3>
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        to="/providers"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col px-4 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                      >
                        <span className="font-medium text-gray-700">{service.name}</span>
                        <span className="text-sm text-gray-500">{service.description}</span>
                      </Link>
                    ))}
                  </div>
                </nav>
                
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/providers" onClick={() => setIsOpen(false)}>
                      تصفح المعلمين
                    </Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <Link to="/providers" onClick={() => setIsOpen(false)}>
                      ابدأ الآن
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Ethereal bottom border */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-500",
        isScrolled && "opacity-30"
      )}></div>
    </header>
  );
};

export default DivineHeader;
