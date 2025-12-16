import React from 'react';
import { Camera, Mic } from 'lucide-react';
import type { Media } from '../services/api';

interface MediaViewerProps {
  media: Media;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ media }) => {
  return (
    <div className="glass p-6 rounded-2xl relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 tracking-tight">
        <Camera className="w-5 h-5 text-accent" />
        Latest Capture
      </h3>
      
      <div className="space-y-6">
        <div className="relative aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/10 shadow-inner group">
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

        <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/10">
          <Mic className="w-5 h-5 text-accent" />
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
