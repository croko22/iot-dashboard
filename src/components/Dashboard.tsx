import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Flame, Wind } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import type { SensorData, Thresholds, Media, SystemStatus } from '../services/api';
import { SensorCard } from './SensorCard';
import { ThresholdControl } from './ThresholdControl';
import { MediaViewer } from './MediaViewer';
import { StatusIndicator } from './StatusIndicator';
import { PageBackground } from './PageBackground';

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

  useEffect(() => {
    api.fetchThresholds().then(setThresholds).catch(console.error);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); 
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

  const isFireDetected = React.useMemo(() => {
    if (!sensors) return false;
    
    if (sensors.fire_detected) return true;

    const tempExceeded = 
      sensors.temperature !== null && 
      thresholds?.temperature_max !== undefined && 
      sensors.temperature > thresholds.temperature_max;
      
    const gasExceeded = 
      sensors.gas_level !== null && 
      thresholds?.gas_max !== undefined && 
      sensors.gas_level > thresholds.gas_max;

    return tempExceeded || gasExceeded;
  }, [sensors, thresholds]);

  // Compute effective system status
  // If we detect fire client-side, we override the backend status to 'Confirmado'
  const effectiveStatus: SystemStatus | null = React.useMemo(() => {
    if (isFireDetected) {
      return {
        status: 'Confirmado',
        message: 'CRITICAL ALERT: Hazardous Conditions Detected',
      };
    }
    return status;
  }, [isFireDetected, status]);

  if (loading && !sensors) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden">
        <PageBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="text-muted-foreground animate-pulse">Initializing System...</p>
        </div>
      </div>
    );
  }

  if (!sensors && !loading) {
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground selection:bg-accent/30 selection:text-white">
      <PageBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-12 space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">IoT Monitor</span>
            </h1>
            <p className="text-muted-foreground text-lg">Real-time sensor dashboard & fire detection system</p>
          </div>
          {effectiveStatus && <StatusIndicator status={effectiveStatus} />}
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
                value={isFireDetected ? 'DETECTED' : 'Safe'}
                unit=""
                icon={Flame}
                isAlert={isFireDetected}
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
