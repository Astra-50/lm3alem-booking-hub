
import React from 'react';
import FooterNewsletter from './footer/FooterNewsletter';
import FooterBrand from './footer/FooterBrand';
import FooterNavigation from './footer/FooterNavigation';
import FooterBottom from './footer/FooterBottom';

const CathedralFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <FooterNewsletter />

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <FooterBrand />
            <FooterNavigation />
          </div>
        </div>

        {/* Bottom Section */}
        <FooterBottom />
      </div>
      
      {/* Bottom ethereal glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </footer>
  );
};

export default CathedralFooter;
