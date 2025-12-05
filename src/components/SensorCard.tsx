import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  threshold?: number;
  isAlert?: boolean;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  threshold,
  isAlert = false,
}) => {
  const isExceeded = threshold !== undefined && typeof value === 'number' && value > threshold;
  const statusColor = isAlert || isExceeded ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-700';

  return (
    <div className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ${statusColor}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">{title}</h3>
        <Icon className="w-5 h-5 opacity-70" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold">{typeof value === 'number' ? value.toFixed(1) : value}</span>
        <span className="text-sm font-medium opacity-70">{unit}</span>
      </div>
      {threshold !== undefined && (
        <div className="mt-2 text-xs opacity-60">
          Threshold: {threshold} {unit}
        </div>
      )}
    </div>
  );
};
