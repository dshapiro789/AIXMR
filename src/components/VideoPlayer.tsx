import React from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className = '' }) => {
  return (
    <>
      {/* Mobile video - shows on screens smaller than md (768px) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover md:hidden ${className}`}
        style={{
          objectPosition: 'center center',
          borderRadius: 'inherit'
        }}
      >
        <source src="/Main.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Desktop/tablet video - shows on md screens and larger */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover hidden md:block ${className}`}
        style={{
          objectPosition: 'center center',
          borderRadius: 'inherit'
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default VideoPlayer;