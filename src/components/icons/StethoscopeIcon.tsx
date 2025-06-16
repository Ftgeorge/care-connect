import React from 'react';

interface StethoscopeIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const StethoscopeIcon: React.FC<StethoscopeIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C9.23858 2 7 4.23858 7 7V9C7 9.55228 6.55228 10 6 10C5.44772 10 5 9.55228 5 9V7C5 3.13401 8.13401 0 12 0C15.866 0 19 3.13401 19 7V9C19 9.55228 18.5523 10 18 10C17.4477 10 17 9.55228 17 9V7C17 4.23858 14.7614 2 12 2Z"
        fill={color}
      />
      <path
        d="M12 4C10.3431 4 9 5.34315 9 7V9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9V7C15 5.34315 13.6569 4 12 4Z"
        fill={color}
      />
      <path
        d="M12 12C8.68629 12 6 14.6863 6 18V22C6 22.5523 6.44772 23 7 23H17C17.5523 23 18 22.5523 18 22V18C18 14.6863 15.3137 12 12 12Z"
        fill={color}
      />
      <path
        d="M12 14C9.79086 14 8 15.7909 8 18V20H16V18C16 15.7909 14.2091 14 12 14Z"
        fill={color}
      />
    </svg>
  );
};

export default StethoscopeIcon; 