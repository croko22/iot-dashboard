import axios from 'axios';

export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  gas_level: number | null;
  fire_detected: boolean | null;
  timestamp: string;
}

export interface Thresholds {
  temperature_max: number;
  gas_max: number;
}

export interface Media {
  photo_url: string;
  audio_url: string;
  timestamp: string;
}

export interface SystemStatus {
  status: 'Normal' | 'Riesgo' | 'Confirmado';
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async fetchSensors(): Promise<SensorData> {
    try {
      const response = await apiClient.get<SensorData>('/sensors');
      return response.data;
    } catch (error) {
      console.error('Error fetching sensors:', error);
      return {
        temperature: null,
        humidity: null,
        gas_level: null,
        fire_detected: null,
        timestamp: new Date().toISOString(),
      };
    }
  },

  async fetchThresholds(): Promise<Thresholds> {
    try {
      const response = await apiClient.get<Thresholds>('/thresholds');
      return response.data;
    } catch (error) {
      console.error('Error fetching thresholds:', error);
      return {
        temperature_max: 30,
        gas_max: 200,
      };
    }
  },

  async updateThreshold(data: Partial<Thresholds>): Promise<Thresholds> {
    try {
      const response = await apiClient.post<Thresholds>('/thresholds', data);
      return response.data;
    } catch (error) {
      console.error('Error updating thresholds:', error);
      throw error;
    }
  },

  async fetchLatestMedia(): Promise<Media> {
    try {
      const response = await apiClient.get<Media>('/media/latest');
      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      return {
        photo_url: 'https://placehold.co/600x400?text=No+Image',
        audio_url: '',
        timestamp: new Date().toISOString(),
      };
    }
  },

  async fetchStatus(): Promise<SystemStatus> {
    try {
      const response = await apiClient.get<SystemStatus>('/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching status:', error);
      return {
        status: 'Normal',
        message: 'System operating normally',
      };
    }
  },
};
