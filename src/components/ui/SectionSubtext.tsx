import React from 'react';

interface SectionSubtextProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionSubtext: React.FC<SectionSubtextProps> = ({ children, className = '' }) => (
  <p className={`text-xl lg:text-base xl:text-base 2xl:text-xl text-[#636e72] max-w-2xl mx-auto ${className}`}>
    {children}
  </p>
);

export default SectionSubtext; 