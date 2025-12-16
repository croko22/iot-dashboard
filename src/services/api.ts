import axios from 'axios';

export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  gas_level: number | null;
  smoke_level?: number | null; // Added to match backend
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async fetchSensors(): Promise<SensorData> {
    try {
      const response = await apiClient.get<any>('/sensors');
      const data = response.data;
      return {
        temperature: data.temperature,
        humidity: data.humidity,
        // Map smoke_level to gas_level if gas_level is missing
        gas_level: data.gas_level ?? data.smoke_level ?? null,
        smoke_level: data.smoke_level ?? null,
        fire_detected: data.fire_detected,
        timestamp: data.timestamp,
      };
    } catch (error) {
      console.error('Error fetching sensors:', error);
      return {
        temperature: null,
        humidity: null,
        gas_level: null,
        smoke_level: null,
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
      const response = await apiClient.get<any>('/media/latest');
      const data = response.data;
      
      console.log(data);

      let photo_url = data.latest_photo || data.photo_url || data.annotated_image_url || null;
      if (photo_url && photo_url.startsWith('/')) {
        photo_url = `${API_BASE_URL}${photo_url}`;
      }

      let audio_url = data.latest_audio || data.audio_url || null;
      if (audio_url && audio_url.startsWith('/')) {
        audio_url = `${API_BASE_URL}${audio_url}`;
      }

      return {
        photo_url: photo_url || 'https://placehold.co/600x400?text=No+Image',
        audio_url: audio_url || '',
        timestamp: data.timestamp || new Date().toISOString(),
      };
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
