import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-2xl shadow-md bg-white/5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card; 