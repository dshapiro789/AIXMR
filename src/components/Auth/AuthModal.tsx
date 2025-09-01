import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { authHelpers } from '../../utils/supabaseClient';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Card from '../UI/Card';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: any) => void;
}

type AuthMode = 'signin' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signup') {
        const { data, error } = await authHelpers.signUp(email, password);
        
        if (error) {
          setError(error.message);
        } else if (data.user) {
          if (data.user.email_confirmed_at) {
            // User is immediately confirmed
            setSuccess('Account created successfully! You are now logged in.');
            setTimeout(() => {
              onAuthSuccess?.(data.user);
              handleClose();
            }, 1500);
          } else {
            // Email confirmation required
            setSuccess('Account created! Please check your email to confirm your account before signing in.');
            setTimeout(() => {
              setMode('signin');
              setSuccess('');
            }, 3000);
          }
        }
      } else {
        const { data, error } = await authHelpers.signIn(email, password);
        
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and confirm your account before signing in.');
          } else if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please check your credentials and try again.');
          } else {
            setError(error.message);
          }
        } else if (data.user) {
          setSuccess('Successfully signed in!');
          setTimeout(() => {
            onAuthSuccess?.(data.user);
            handleClose();
          }, 1000);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'signin' ? 'Sign In' : 'Create Account'}
      size="md"
    >
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === 'signin'
                ? 'bg-deep-rose-800 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === 'signup'
                ? 'bg-deep-rose-800 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Card variant="security" className="p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          </Card>
        )}

        {success && (
          <Card className="p-4 bg-green-900/25 border-green-600/40">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-200">{success}</p>
            </div>
          </Card>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            icon={Mail}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              icon={Lock}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-slate-400 hover:text-slate-300 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {mode === 'signup' && (
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                icon={Lock}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-300 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
            icon={mode === 'signin' ? Mail : User}
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Switch Mode Link */}
        <div className="text-center">
          <button
            onClick={switchMode}
            className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            disabled={isLoading}
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>

        {/* Privacy Notice */}
        <Card variant="security" className="p-4">
          <h4 className="font-medium text-deep-rose-400 mb-2 text-sm">🔒 Privacy & Security</h4>
          <ul className="text-xs text-deep-rose-200 space-y-1">
            <li>• Your account data is securely stored with Supabase</li>
            <li>• We use industry-standard encryption for all data</li>
            <li>• Your settings and preferences are private to your account</li>
            <li>• We never share your personal information</li>
          </ul>
        </Card>
      </div>
    </Modal>
  );
};

export default AuthModal;