import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  className?: string;
  titleClassname?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, highlight, className, titleClassname = '' }) => (
  <div className={`text-center mb-16 ${className}`}>
    {subtitle && (
      <span className="inline-block px-4 py-2 rounded-full bg-[#D98586]/10 text-[#D98586] text-sm font-medium mb-4">
        {subtitle}
      </span>
    )}
    <h2 className={`text-3xl sm:text-4xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-display font-bold text-[#2D3436] mb-4 lg:mb-1 xl:mb-1 2xl:mb-4 ${titleClassname}`}>
      {title}
      {highlight && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D98586] to-[#B07A7B] ml-2">{highlight}</span>
      )}
    </h2>
  </div>
);

export default SectionHeader; 