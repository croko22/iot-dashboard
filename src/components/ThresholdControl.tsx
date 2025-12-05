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
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-800">Threshold Settings</h3>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Temperature (°C)
          </label>
          <input
            type="number"
            name="temperature_max"
            value={localThresholds.temperature_max}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Gas Level
          </label>
          <input
            type="number"
            name="gas_max"
            value={localThresholds.gas_max}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};
