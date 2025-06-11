import React, { useState } from 'react';
import StethoscopeIcon from '../icons/StethoscopeIcon';

interface DoctorMarkerProps {
  name: string;
  onClick?: () => void;
}

const DoctorMarker: React.FC<DoctorMarkerProps> = ({ name, onClick }) => {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onClick={onClick}
    >
      <div
        className="
          w-[30px] h-[30px]
          bg-white
          border-4 border-white
          rounded-full
          flex items-center justify-center
          shadow-[0_2px_10px_rgba(0,0,0,0.1),0_4px_15px_rgba(0,0,0,0.05),inset_0_-2px_4px_rgba(0,0,0,0.05)]
          cursor-pointer
          transition-transform duration-200
          hover:scale-110
        "
      >
        <StethoscopeIcon size={16} />
      </div>
      
      <div
        className={`
          absolute
          top-[55px]
          left-1/2
          -translate-x-1/2
          bg-black/80
          text-white
          px-2 py-1
          rounded-md
          text-xs
          font-semibold
          whitespace-nowrap
          transition-opacity duration-200
          pointer-events-none
          z-50
          ${showLabel ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {name}
      </div>
    </div>
  );
};

export default DoctorMarker; 