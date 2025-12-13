import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Flame, Wind } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import type { SensorData, Thresholds, Media, SystemStatus } from '../services/api';
import { SensorCard } from './SensorCard';
import { ThresholdControl } from './ThresholdControl';
import { MediaViewer } from './MediaViewer';
import { StatusIndicator } from './StatusIndicator';

export const Dashboard: React.FC = () => {
  const [sensors, setSensors] = useState<SensorData | null>(null);
  const [thresholds, setThresholds] = useState<Thresholds | null>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [sensorsData, mediaData, statusData] = await Promise.all([
        api.fetchSensors(),
        api.fetchLatestMedia(),
        api.fetchStatus(),
      ]);
      setSensors(sensorsData);
      setMedia(mediaData);
      setStatus(statusData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch for thresholds (usually static or user-controlled)
  useEffect(() => {
    api.fetchThresholds().then(setThresholds).catch(console.error);
  }, []);

  // Polling for real-time data
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleThresholdUpdate = async (newThresholds: Thresholds) => {
    try {
      const updated = await api.updateThreshold(newThresholds);
      setThresholds(updated);
      toast.success('Thresholds updated successfully');
    } catch (error) {
      console.error('Failed to update thresholds:', error);
      toast.error('Failed to update thresholds');
    }
  };

  if (loading && !sensors) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">IoT Monitor</h1>
            <p className="text-gray-500 mt-1">Real-time sensor dashboard & fire detection system</p>
          </div>
          {status && <StatusIndicator status={status} />}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensors && (
            <>
              <SensorCard
                title="Temperature"
                value={sensors.temperature ?? '---'}
                unit="°C"
                icon={Thermometer}
                threshold={thresholds?.temperature_max}
              />
              <SensorCard
                title="Humidity"
                value={sensors.humidity ?? '---'}
                unit="%"
                icon={Droplets}
              />
              <SensorCard
                title="Gas Level"
                value={sensors.gas_level ?? '---'}
                unit="ppm"
                icon={Wind}
                threshold={thresholds?.gas_max}
              />
              <SensorCard
                title="Fire Status"
                value={sensors.fire_detected === null ? '---' : (sensors.fire_detected ? 'DETECTED' : 'Safe')}
                unit=""
                icon={Flame}
                isAlert={sensors.fire_detected === true}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {media && <MediaViewer media={media} />}
          </div>
          <div className="lg:col-span-1">
            {thresholds && (
              <ThresholdControl 
                thresholds={thresholds} 
                onUpdate={handleThresholdUpdate} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
