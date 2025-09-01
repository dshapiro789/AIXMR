import React, { useState } from 'react';
import { Settings, Sliders, Bot, Database, Shield, Download, User } from 'lucide-react';
import { AppSettings } from '../../types';
import { storageUtils } from '../../utils/storage';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ModelSettings from './ModelSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'models' | 'privacy' | 'data'>('general');
  const [settings, setSettings] = useState<AppSettings>(storageUtils.getSettings());
  const [hasChanges, setHasChanges] = useState(false);
  const { user } = useAuth();

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'models', label: 'AI Models', icon: Bot },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data', icon: Database }
  ];

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    storageUtils.saveSettings(settings);
    setHasChanges(false);
  };

  const exportData = () => {
    const data = storageUtils.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monero-tutor-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-ink-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 font-noto-serif">
          Settings
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Configure your AI Monero Tutor experience.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-slate-700/50">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-deep-rose-500 text-deep-rose-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* User Account Info */}
          {user && (
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-deep-rose-500" />
                <h2 className="text-xl font-semibold text-slate-100">Account Information</h2>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-deep-rose-800 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Signed in as</p>
                    <p className="text-slate-100 font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Sliders className="w-5 h-5 text-deep-rose-500" />
              <h2 className="text-xl font-semibold text-slate-100">General Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  AI Response Temperature: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => updateSetting('temperature', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>More Focused</span>
                  <span>More Creative</span>
                </div>
              </div>
            </div>
          </Card>

          {hasChanges && (
            <Card variant="warning">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-medium text-amber-200">Unsaved Changes</h3>
                    <p className="text-sm text-amber-300">You have unsaved changes to your settings.</p>
                  </div>
                </div>
                <Button variant="primary" onClick={saveSettings}>
                  Save Changes
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'models' && <ModelSettings />}

      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-5 h-5 text-deep-rose-500" />
              <h2 className="text-xl font-semibold text-slate-100">Privacy Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-100">Don't Log Chats</h3>
                  <p className="text-sm text-slate-400">Prevent chat history from being saved locally</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.dontLogChats}
                    onChange={(e) => updateSetting('dontLogChats', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-deep-rose-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-deep-rose-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-100">Anonymize IP</h3>
                  <p className="text-sm text-slate-400">Use privacy-focused networking when possible</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.anonymizeIP}
                    onChange={(e) => updateSetting('anonymizeIP', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-deep-rose-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-deep-rose-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-100">Disable Telemetry</h3>
                  <p className="text-sm text-slate-400">Prevent usage analytics collection</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.disableTelemetry}
                    onChange={(e) => updateSetting('disableTelemetry', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-deep-rose-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-deep-rose-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {hasChanges && (
            <Card variant="warning">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-medium text-amber-200">Unsaved Changes</h3>
                    <p className="text-sm text-amber-300">You have unsaved changes to your settings.</p>
                  </div>
                </div>
                <Button variant="primary" onClick={saveSettings}>
                  Save Changes
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'data' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-5 h-5 text-deep-rose-500" />
              <h2 className="text-xl font-semibold text-slate-100">Data Management</h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-charcoal/50 rounded-lg border border-slate-700/50">
                <h3 className="font-medium text-slate-100 mb-2">Export Data</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Download all your settings, models, and chat history as a JSON file.
                </p>
                <Button variant="secondary" icon={Download} onClick={exportData}>
                  Export All Data
                </Button>
              </div>
              
              <div className="p-4 bg-red-900/25 rounded-lg border border-red-600/40">
                <h3 className="font-medium text-red-300 mb-2">Clear Chat History</h3>
                <p className="text-red-200 text-sm mb-4">
                  Permanently delete all stored chat conversations. This cannot be undone.
                </p>
                <Button 
                  variant="danger" 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all chat history?')) {
                      storageUtils.clearChatHistory();
                      alert('Chat history cleared successfully!');
                    }
                  }}
                >
                  Clear History
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;