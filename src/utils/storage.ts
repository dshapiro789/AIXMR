import { AppSettings, ModelConfig, ChatMessage } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'monero_tutor_settings',
  MODELS: 'monero_tutor_models',
  CHAT_HISTORY: 'monero_tutor_chat_history'
};

export const defaultSettings: AppSettings = {
  preferredModel: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
  dontLogChats: true,
  anonymizeIP: true,
  disableTelemetry: true,
  temperature: 0.2
};

// =============================================================================
// DEFAULT SYSTEM MODEL CONFIGURATION
// =============================================================================
// To change the default system model:
// 1. Update the model configuration below (id, name, baseUrl, apiKey)
// 2. Update defaultSettings.preferredModel to match the new model's id
// 3. The model will appear as "Default AI Tutor" in the UI
// =============================================================================

export const defaultModels: ModelConfig[] = [
  // CURRENT DEFAULT SYSTEM MODEL: Venice: Uncensored (free)
  // This model powers the default "AI Tutor" experience
  {
    id: 'perplexity/sonar-reasoning',
    name: 'Perplexity: Sonar Reasoning',
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    isDefault: false
  },
  // Previous model kept as alternative option
  {
    id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
    name: 'Venice: Uncensored (free)',
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY2,
    isDefault: true
  }
  
  // To add additional models, uncomment and configure below:
  // {
  //   id: 'your-model-id',
  //   name: 'Your Model Name',
  //   baseUrl: 'https://your-api-endpoint.com/v1',
  //   apiKey: 'your-api-key',
  //   isDefault: false
  // }
];

export const updatePreferredModel = (modelId: string): void => {
  const settings = storageUtils.getSettings();
  settings.preferredModel = modelId;
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const storageUtils = {
  getSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },

  getModels(): ModelConfig[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MODELS);
      return stored ? JSON.parse(stored) : defaultModels;
    } catch {
      return defaultModels;
    }
  },

  saveModels(models: ModelConfig[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models));
    } catch (error) {
      console.error('Failed to save models:', error);
    }
  },

  getChatHistory(): ChatMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (!stored) return [];
      
      const messages = JSON.parse(stored);
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch {
      return [];
    }
  },

  saveChatHistory(messages: ChatMessage[]): void {
    try {
      const settings = storageUtils.getSettings();
      if (settings.dontLogChats) return;
      
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  },

  clearChatHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  },

  addModel(model: ModelConfig): void {
    try {
      const models = storageUtils.getModels();
      const updatedModels = [...models, model];
      storageUtils.saveModels(updatedModels);
    } catch (error) {
      console.error('Failed to add model:', error);
    }
  },

  deleteModel(id: string): void {
    try {
      const models = storageUtils.getModels();
      const updatedModels = models.filter(model => model.id !== id && !model.isDefault);
      storageUtils.saveModels(updatedModels);
    } catch (error) {
      console.error('Failed to delete model:', error);
    }
  },

  updatePreferredModel(id: string): void {
    try {
      const settings = storageUtils.getSettings();
      const updatedSettings = { ...settings, preferredModel: id };
      storageUtils.saveSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update preferred model:', error);
    }
  },

  exportData() {
    return {
      settings: storageUtils.getSettings(),
      models: storageUtils.getModels(),
      chatHistory: storageUtils.getChatHistory(),
      exportDate: new Date().toISOString()
    };
  }
};