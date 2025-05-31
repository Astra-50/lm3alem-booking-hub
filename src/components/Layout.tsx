
import React from 'react';
import { cn } from '@/lib/utils';
import DivineHeader from './DivineHeader';
import CathedralFooter from './CathedralFooter';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen bg-gray-50 flex flex-col", className)}>
      <DivineHeader />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <CathedralFooter />
    </div>
  );
};

export default Layout;
