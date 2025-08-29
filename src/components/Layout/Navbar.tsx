import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, MessageCircle, Book, Settings, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/resources', label: 'Resources', icon: Book },
    { path: '/learn', label: 'Learn', icon: Book },
    { path: '/contact', label: 'Contact', icon: Heart },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/xmr.png" 
              alt="XMR Logo" 
              className="w-8 h-8 sm:w-6 sm:h-6 object-contain group-hover:opacity-80 transition-opacity flex-shrink-0"
            />
            <span className="text-base sm:text-sm md:text-base lg:text-lg font-bold text-slate-100 truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-none">
              AI XMR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? 'bg-deep-rose-800 text-white shadow-lg shadow-deep-rose-500/25'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-gray-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-slate-100 hover:bg-gray-800/80 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 flex items-center space-x-3 ${
                      isActive(item.path)
                        ? 'bg-deep-rose-800 text-white shadow-lg shadow-deep-rose-500/25'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-gray-800/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;