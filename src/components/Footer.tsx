import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} Ndoye Dev. Tous droits réservés.</p>
      </div>
    </footer>
  );
};