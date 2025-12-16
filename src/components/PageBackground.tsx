import React from 'react';

export const PageBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Layer 2: Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Layer 3: Animated Gradient Blobs */}
      {/* Primary Top-Center Blob */}
      <div 
        className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[900px] h-[600px] 
                   bg-accent/20 blur-[120px] rounded-full animate-float opacity-30"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Secondary Left Blob */}
      <div 
        className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] 
                   bg-indigo-500/10 blur-[100px] rounded-full animate-float opacity-20"
        style={{ animationDelay: '-2s', animationDuration: '15s' }}
      />
      
      {/* Tertiary Right Blob */}
      <div 
        className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] 
                   bg-blue-600/10 blur-[100px] rounded-full animate-float opacity-20"
        style={{ animationDelay: '-5s', animationDuration: '12s' }}
      />

      {/* Layer 4: Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
    </div>
  );
};
