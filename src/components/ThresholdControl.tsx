import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';
import type { Thresholds } from '../services/api';

interface ThresholdControlProps {
  thresholds: Thresholds;
  onUpdate: (newThresholds: Thresholds) => void;
}

export const ThresholdControl: React.FC<ThresholdControlProps> = ({ thresholds, onUpdate }) => {
  const [localThresholds, setLocalThresholds] = useState<Thresholds>(thresholds);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalThresholds(thresholds);
  }, [thresholds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalThresholds((prev: Thresholds) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = () => {
    onUpdate(localThresholds);
    setIsEditing(false);
  };

  return (
    <div className="glass p-6 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground tracking-tight">Threshold Settings</h3>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setLocalThresholds(thresholds); }}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
            Max Temperature (°C)
          </label>
          <input
            type="number"
            name="temperature_max"
            value={localThresholds.temperature_max}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 bg-[#0F0F12] border border-white/10 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent 
                       text-foreground placeholder:text-muted-foreground/50 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
            Max Gas Level
          </label>
          <input
            type="number"
            name="gas_max"
            value={localThresholds.gas_max}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 bg-[#0F0F12] border border-white/10 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent 
                       text-foreground placeholder:text-muted-foreground/50 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};
