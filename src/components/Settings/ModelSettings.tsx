import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Bot, Key, Globe, Tag, MessageCircle, AlertTriangle } from 'lucide-react';
import { ModelConfig, AppSettings } from '../../types';
import { storageUtils } from '../../utils/storage';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

interface ModelSettingsProps {
  currentSettings: AppSettings;
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

const ModelSettings: React.FC<ModelSettingsProps> = ({ currentSettings, onUpdateSetting }) => {
  const [models, setModels] = useState<ModelConfig[]>([]);
  const [newModel, setNewModel] = useState({
    id: '',
    name: '',
    provider: '',
    baseUrl: '',
    apiKey: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const addModelFormRef = useRef<HTMLDivElement>(null);

  // Defensive check - prevent crashes if settings aren't loaded yet
  if (!currentSettings) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <Card>
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-deep-rose-800/50 rounded"></div>
                <div className="h-6 bg-slate-700 rounded w-48"></div>
              </div>
              <div className="h-10 bg-deep-rose-800/30 rounded-lg w-32"></div>
            </div>
            <div className="h-4 bg-slate-700/60 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-700/40 rounded w-1/2"></div>
          </div>
        </Card>

        {/* Available Models Skeleton */}
        <Card>
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 bg-slate-700 rounded w-40"></div>
              <div className="h-10 bg-deep-rose-800/30 rounded-lg w-28"></div>
            </div>
            
            <div className="space-y-4">
              {/* Model Card Skeletons */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-4 h-4 bg-deep-rose-700/50 rounded-full"></div>
                      <div className="w-5 h-5 bg-deep-rose-800/50 rounded"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-700 rounded w-48"></div>
                        <div className="h-3 bg-slate-700/60 rounded w-32"></div>
                        <div className="h-3 bg-slate-700/40 rounded w-56"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-6 bg-blue-800/30 rounded w-16"></div>
                      <div className="h-6 bg-green-800/30 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Chat History Skeleton */}
        <Card>
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-deep-rose-800/50 rounded"></div>
                <div className="space-y-1">
                  <div className="h-5 bg-slate-700 rounded w-32"></div>
                  <div className="h-3 bg-slate-700/60 rounded w-48"></div>
                </div>
              </div>
              <div className="h-10 bg-red-800/30 rounded-lg w-40"></div>
            </div>
            
            <div className="bg-amber-900/15 border border-amber-600/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-amber-600/50 rounded mt-0.5"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-amber-700/40 rounded w-40"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-amber-700/30 rounded w-full"></div>
                    <div className="h-3 bg-amber-700/30 rounded w-3/4"></div>
                    <div className="h-3 bg-amber-700/30 rounded w-5/6"></div>
                    <div className="h-3 bg-amber-700/30 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice Skeleton */}
        <Card variant="security">
          <div className="animate-pulse">
            <div className="h-4 bg-deep-rose-700/50 rounded w-48 mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-deep-rose-700/30 rounded w-full"></div>
              <div className="h-3 bg-deep-rose-700/30 rounded w-4/5"></div>
              <div className="h-3 bg-deep-rose-700/30 rounded w-3/4"></div>
              <div className="h-3 bg-deep-rose-700/30 rounded w-5/6"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (showAddForm && addModelFormRef.current) {
      setTimeout(() => {
        addModelFormRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [showAddForm]);

  const loadModels = () => {
    const loadedModels = storageUtils.getModels();
    setModels(loadedModels);
  };

  const handleAddModel = () => {
    if (!newModel.id.trim() || !newModel.name.trim()) {
      alert('Model ID and Name are required');
      return;
    }

    // Check if model ID already exists
    if (models.some(model => model.id === newModel.id)) {
      alert('A model with this ID already exists');
      return;
    }

    const modelToAdd: ModelConfig = {
      id: newModel.id.trim(),
      name: newModel.name.trim(),
      provider: newModel.provider.trim() || undefined,
      baseUrl: newModel.baseUrl.trim() || undefined,
      apiKey: newModel.apiKey.trim() || undefined,
      isDefault: false
    };

    storageUtils.addModel(modelToAdd);
    setModels([...models, modelToAdd]);
    setNewModel({ id: '', name: '', provider: '', baseUrl: '', apiKey: '' });
    setShowAddForm(false);
  };

  const handleDeleteModel = (id: string) => {
    if (window.confirm('Are you sure you want to delete this model?')) {
      storageUtils.deleteModel(id);
      const updatedModels = models.filter(model => model.id !== id);
      setModels(updatedModels);
      
      // If the deleted model was the preferred one, reset to default
      if (currentSettings.preferredModel === id) {
        const defaultModel = updatedModels.find(m => m.isDefault);
        if (defaultModel) {
          onUpdateSetting('preferredModel', defaultModel.id);
        }
      }
    }
  };

  const handlePreferredModelChange = (modelId: string) => {
    onUpdateSetting('preferredModel', modelId);
  };

  const handleClearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      storageUtils.clearChatHistory();
      alert('Chat history cleared successfully!');
    }
  };

  const resetAddForm = () => {
    setNewModel({ id: '', name: '', provider: '', baseUrl: '', apiKey: '' });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 mb-3 sm:mb-4 font-noto-serif">
          AI Model Settings
        </h1>
        <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
          Configure your AI models and select your preferred chat assistant.
        </p>
      </div>

      {/* Current Models */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100">Available Models</h2>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto"
          >
            Add Model
          </Button>
        </div>

        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30"
            >
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                <input
                  type="radio"
                  name="preferredModel"
                  value={model.id}
                  checked={currentSettings.preferredModel === model.id}
                  onChange={() => handlePreferredModelChange(model.id)}
                  className="text-deep-rose-600 focus:ring-deep-rose-500 mt-1 sm:mt-0 flex-shrink-0"
                />
                <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <Bot className="w-5 h-5 text-deep-rose-500" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-slate-100 text-sm sm:text-base truncate">{model.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">ID: {model.id}</p>
                    {model.provider && (
                      <p className="text-xs text-slate-500 truncate">Provider: {model.provider}</p>
                    )}
                    {model.baseUrl && (
                      <p className="text-xs text-slate-500 truncate">Endpoint: {model.baseUrl}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end sm:justify-start space-x-2 flex-shrink-0">
                {model.isDefault && (
                  <span className="px-2 py-1 text-xs bg-blue-900/40 text-blue-300 rounded whitespace-nowrap">
                    Default
                  </span>
                )}
                {model.apiKey && (
                  <span className="px-2 py-1 text-xs bg-green-900/40 text-green-300 rounded whitespace-nowrap">
                    API Key Set
                  </span>
                )}
                {!model.isDefault && (
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDeleteModel(model.id)}
                    className="whitespace-nowrap"
                  >
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add New Model Form */}
      {showAddForm && (
        <Card className="mb-6" ref={addModelFormRef}>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6">Add New Model</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Input
              label="Model ID"
              placeholder="e.g., perplexity/sonar-reasoning"
              value={newModel.id}
              onChange={(value) => setNewModel({ ...newModel, id: value })}
              icon={Tag}
              required
            />
            
            <Input
              label="Model Name"
              placeholder="e.g., Perplexity: Sonar Reasoning"
              value={newModel.name}
              onChange={(value) => setNewModel({ ...newModel, name: value })}
              icon={Bot}
              required
            />
            
            <Input
              label="Provider"
              placeholder="e.g., OpenRouter, OpenAI, Anthropic"
              value={newModel.provider}
              onChange={(value) => setNewModel({ ...newModel, provider: value })}
              icon={Globe}
            />
            
            <div className="sm:col-span-2">
              <Input
                label="API Endpoint"
                placeholder="e.g., https://openrouter.ai/api/v1"
                value={newModel.baseUrl}
                onChange={(value) => setNewModel({ ...newModel, baseUrl: value })}
                icon={Globe}
              />
            </div>
            
            <div className="sm:col-span-2">
              <Input
                label="API Key"
                type="password"
                placeholder="Your API key"
                value={newModel.apiKey}
                onChange={(value) => setNewModel({ ...newModel, apiKey: value })}
                icon={Key}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={handleAddModel}
              disabled={!newModel.id.trim() || !newModel.name.trim()}
              className="w-full sm:w-auto"
            >
              Add Model
            </Button>
            <Button
              variant="secondary"
              onClick={resetAddForm}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Chat History Management */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-deep-rose-500" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100">Chat History</h2>
              <p className="text-sm text-slate-400">Manage your conversation history</p>
            </div>
          </div>
          <Button
            variant="danger"
            onClick={handleClearChatHistory}
            className="w-full sm:w-auto"
          >
            Clear All Chat History
          </Button>
        </div>
        
        <div className="bg-amber-900/25 border border-amber-600/40 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-200">
              <p className="font-medium mb-1">About Chat History</p>
              <ul className="space-y-1 text-xs">
                <li>• Chat history is stored locally in your browser</li>
                <li>• Clearing history will permanently delete all conversations</li>
                <li>• This action cannot be undone</li>
                <li>• History is automatically cleared if "Don't Log Chats" is enabled</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card variant="security">
        <h3 className="font-semibold text-deep-rose-400 mb-3 text-sm sm:text-base">🔒 Privacy & Security</h3>
        <ul className="text-xs sm:text-sm text-deep-rose-200 space-y-2">
          <li>• API keys are stored locally in your browser only</li>
          <li>• Keys are never transmitted to our servers</li>
          <li>• Consider using environment variables for production</li>
          <li>• Delete unused models to minimize stored credentials</li>
        </ul>
      </Card>
    </div>
  );
};

export default ModelSettings;