export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    urgency?: 'low' | 'medium' | 'high';
    hasNearbyResources?: boolean;
    language?: string;
  };
}

export interface ChatResponse {
  message: string;
  metadata?: {
    urgency: 'low' | 'medium' | 'high';
    hasNearbyResources: boolean;
    language: string;
    timestamp: string;
  };
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}