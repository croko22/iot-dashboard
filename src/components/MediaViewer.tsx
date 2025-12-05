import React from 'react';
import { Camera, Mic } from 'lucide-react';
import type { Media } from '../services/api';

interface MediaViewerProps {
  media: Media;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ media }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-gray-500" />
        Latest Capture
      </h3>
      
      <div className="space-y-4">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          {media.photo_url ? (
            <img 
              src={media.photo_url} 
              alt="Latest capture" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image available
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
            {new Date(media.timestamp).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <Mic className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 mb-1">Latest Audio Recording</p>
            {media.audio_url ? (
              <audio controls className="w-full h-8">
                <source src={media.audio_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-sm text-gray-400">No audio available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
