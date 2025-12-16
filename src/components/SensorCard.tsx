import React, { useRef, useState } from 'react';
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
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const isExceeded = threshold !== undefined && typeof value === 'number' && value > threshold;
  
  // Status colors - using design system tokens
  // Alert: Destructive/Red
  // Normal: Glass/Border
  const baseClasses = "relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-md p-6 group";
  
  let colorClasses = "bg-white/[0.03] border-white/[0.06] hover:border-white/[0.1]";
  let iconColor = "text-muted-foreground group-hover:text-foreground transition-colors";
  let valueColor = "text-foreground";
  
  if (isAlert || isExceeded) {
    colorClasses = "bg-destructive/10 border-destructive/30 hover:border-destructive/50";
    iconColor = "text-destructive";
    valueColor = "text-destructive-foreground";
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${colorClasses}`}
    >
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(94,106,210,0.1), transparent 40%)`,
        }}
      />
      
      {/* Border Glow Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-sm uppercase tracking-widest text-muted-foreground">{title}</h3>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-semibold tracking-tight ${valueColor}`}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{unit}</span>
        </div>
        
        {threshold !== undefined && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-muted-foreground flex items-center justify-between">
            <span>Max Limit</span>
            <span className="font-mono bg-white/[0.05] px-2 py-0.5 rounded text-foreground/80">
              {threshold} {unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
