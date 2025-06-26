import React from 'react';

interface StatusPillProps {
  label: string;
  color?: 'high' | 'medium' | 'low';
  className?: string;
}

const colorMap = {
  high: 'border-red-300 bg-red-50 text-red-700',
  medium: 'border-yellow-300 bg-yellow-50 text-yellow-700',
  low: 'border-green-300 bg-green-50 text-green-700',
};

export const StatusPill: React.FC<StatusPillProps> = ({ label, color = 'low', className = '' }) => (
  <div className={`px-3 py-1 rounded border text-xs font-medium ${colorMap[color]} ${className}`}>
    {label}
  </div>
);

export default StatusPill; 