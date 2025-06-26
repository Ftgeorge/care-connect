import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  size?: number;
  borderColor?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = '', icon, size = 48, borderColor = '#D98586', className = '' }) => (
  <div
    className={`rounded-full flex items-center justify-center bg-white overflow-hidden ${className}`}
    style={{ width: size, height: size, border: `3px solid ${borderColor}` }}
  >
    {src ? (
      <Image src={src} alt={alt} width={size} height={size} className="object-cover w-full h-full" />
    ) : icon ? (
      <span className="text-2xl text-[#D98586]">{icon}</span>
    ) : null}
  </div>
);

export default Avatar; 