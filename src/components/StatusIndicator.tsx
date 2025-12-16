import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import type { SystemStatus } from '../services/api';

interface StatusIndicatorProps {
  status: SystemStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusConfig = (statusStr: string) => {
    switch (statusStr) {
      case 'Normal':
        return {
          wrapper: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          iconBg: 'bg-emerald-500/20',
          icon: CheckCircle,
          label: 'Normal',
        };
      case 'Riesgo':
        return {
          wrapper: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          iconBg: 'bg-amber-500/20',
          icon: AlertTriangle,
          label: 'Riesgo',
        };
      case 'Confirmado':
        return {
          wrapper: 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse-slow',
          iconBg: 'bg-red-500/20',
          icon: ShieldAlert,
          label: 'Confirmado',
        };
      default:
        return {
          wrapper: 'bg-white/5 border-white/10 text-muted-foreground',
          iconBg: 'bg-white/10',
          icon: AlertTriangle,
          label: 'Unknown',
        };
    }
  };

  const config = getStatusConfig(status.status);
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-4 px-5 py-3 rounded-full border backdrop-blur-md ${config.wrapper}`}>
      <div className={`p-2 rounded-full ${config.iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
        <h2 className="text-sm font-bold uppercase tracking-widest">{config.label}</h2>
        {status.message && (
          <p className="text-xs opacity-80 hidden md:block border-l border-white/20 pl-3">{status.message}</p>
        )}
      </div>
    </div>
  );
};
