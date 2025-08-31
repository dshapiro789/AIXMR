import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'warning' | 'security' | 'feature';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false 
}) => {
  const baseClasses = 'rounded-lg p-6 transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-ink-black/90 border border-slate-700/50 backdrop-blur-sm',
    warning: 'bg-amber-900/20 border border-amber-600/40 backdrop-blur-sm',
    security: 'bg-red-900/25 border border-red-600/40 backdrop-blur-sm',
    feature: 'bg-ink-black/90 border border-slate-700/50 backdrop-blur-sm hover:border-deep-rose-500/60 hover:bg-charcoal/90'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:shadow-deep-rose-950/20 hover:-translate-y-1 hover:scale-[1.02]' : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;