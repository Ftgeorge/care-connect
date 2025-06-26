import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // e.g. 'bg-[#D98586] text-white'
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', color = 'bg-[#D98586] text-white' }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs ${color} ${className}`}>
    {children}
  </span>
);

export default Badge; 