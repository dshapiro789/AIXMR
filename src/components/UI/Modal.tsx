import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-0">
        <div 
          className="fixed inset-0 bg-black/75 transition-opacity"
          onClick={onClose}
        />
        
        <div className={`relative w-full ${sizeClasses[size]} transform rounded-lg bg-gray-900/95 border border-gray-600/50 shadow-2xl backdrop-blur-md transition-all`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600/50">
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            <Button
              variant="tertiary"
              size="sm"
              icon={X}
              onClick={onClose}
              className="!p-1 hover:bg-gray-800/80 rounded"
            />
          </div>
          
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;