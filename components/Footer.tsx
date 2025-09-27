
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SoilSense AI. All rights reserved.</p>
        <p className="mt-1">Advancing Precision Agriculture with Machine Learning.</p>
      </div>
    </footer>
  );
};

export default Footer;
