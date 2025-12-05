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
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Normal',
        };
      case 'Riesgo':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle,
          label: 'Riesgo',
        };
      case 'Confirmado':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: ShieldAlert,
          label: 'Confirmado',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertTriangle,
          label: 'Unknown',
        };
    }
  };

  const config = getStatusConfig(status.status);
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm ${config.color}`}>
      <div className={`p-3 rounded-full bg-white/50`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-lg font-bold uppercase tracking-wide">{config.label}</h2>
        <p className="text-sm opacity-90">{status.message}</p>
      </div>
    </div>
  );
};
