import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, MessageCircle, Book, Settings, Heart, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../Auth/AuthModal';
import Button from '../UI/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  // Public navigation items (always visible)
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/contact', label: 'Contact', icon: Heart }
  ];

  // Protected navigation items (only visible when logged in)
  const protectedNavItems = [
    { path: '/chat', label: 'Chat', icon: MessageCircle },
    { path: '/resources', label: 'Resources', icon: Book },
    { path: '/learn', label: 'Learn', icon: Book },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  // Combine nav items based on authentication status
  const navItems = user ? [...publicNavItems, ...protectedNavItems] : publicNavItems;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthSuccess = (user: any) => {
    console.log('Auth success:', user);
    setShowAuthModal(false);
  };

  return (
    <>
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
              
              {/* Auth Button - Desktop */}
              <div className="ml-4 pl-4 border-l border-gray-700/50">
                {loading ? (
                  <div className="w-8 h-8 animate-pulse bg-gray-700 rounded"></div>
                ) : user ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={LogOut}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={LogIn}
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign In
                  </Button>
                )}
              </div>
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
                
                {/* Auth Button - Mobile */}
                <div className="pt-2 mt-2 border-t border-gray-700/50">
                  {loading ? (
                    <div className="px-3 py-2">
                      <div className="w-full h-8 animate-pulse bg-gray-700 rounded"></div>
                    </div>
                  ) : user ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 flex items-center space-x-3 text-slate-300 hover:text-slate-100 hover:bg-gray-800/80"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 flex items-center space-x-3 text-slate-300 hover:text-slate-100 hover:bg-gray-800/80"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;