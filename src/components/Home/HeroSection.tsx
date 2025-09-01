import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Book } from 'lucide-react';
import Button from '../UI/Button';
import HeroFog from '../Effects/HeroFog';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex justify-center overflow-hidden">
      {/* Animated star field background */}
      <HeroFog />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-16 sm:pt-20 md:pt-24 lg:pt-32">
        {/* Japanese character with secretive animation */}
        <div className="mb-8 sm:mb-12">
          <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-noto-serif text-deep-rose-500 secretive-text block">
            侍
          </span>
        </div>
        
        {/* Main title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-4 sm:mb-6 font-noto-serif leading-tight">
          Monero Mastery:
        </h1>
        
        {/* Subtitle with red accent */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-deep-rose-500 mb-8 sm:mb-12 font-noto-serif leading-tight md:leading-extra-loose">
          Guided by the Principles
          <br />
          of Privacy
        </h2>
        
        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 sm:mb-16 font-inter max-w-4xl mx-auto leading-relaxed">
          Powered by AI and Community-Vetted Resources.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link to="/chat">
            <Button 
              size="lg" 
              icon={MessageCircle} 
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200"
            >
              Start Chat
            </Button>
          </Link>
          <Link to="/resources">
            <Button 
              variant="secondary" 
              size="lg" 
              icon={Book} 
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 border-2"
            >
              Explore Resources
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;