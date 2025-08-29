export interface Resource {
  id: string;
  name: string;
  category: 'wallet' | 'node' | 'explorer' | 'dev' | 'learning' | 'forum' | 'governance' | 'other';
  platforms: ('win' | 'mac' | 'linux' | 'android' | 'ios' | 'web')[];
  url: string;
  open_source: boolean;
  custodial: boolean;
  tags: string[];
  risk_notes: string;
  status: 'active' | 'archived' | 'unknown';
  last_verified: string;
  description?: string;
}

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  sections: {
    heading: string;
    body_md: string;
  }[];
  related_resources: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: string[];
}

export interface ModelConfig {
  id: string;
  name: string;
  baseUrl?: string;
  apiKey?: string;
  isDefault: boolean;
}

export interface AppSettings {
  preferredModel: string;
  dontLogChats: boolean;
  anonymizeIP: boolean;
  disableTelemetry: boolean;
  temperature: number;
}

export type FilterState = {
  search: string;
  categories: string[];
  platforms: string[];
  tags: string[];
  openSourceOnly: boolean;
  nonCustodialOnly: boolean;
};