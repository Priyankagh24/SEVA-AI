import { useState, useCallback } from 'react';
import type { Message, ChatResponse } from '../types';

export const useChat = (language: string, isOnline: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Mock response for now (we'll connect to backend later)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse: ChatResponse = {
        message: language === 'hi' 
          ? '🏥 यह एक डेमो प्रतिक्रिया है। बैकएंड कनेक्ट होने के बाद, आपको वास्तविक AI प्रतिक्रियाएं मिलेंगी।\n\n✓ आराम करें\n✓ तरल पदार्थ पिएं\n✓ यदि लक्षण बने रहें तो डॉक्टर से मिलें'
          : '🏥 This is a demo response. Once backend is connected, you will get real AI responses.\n\n✓ Get rest\n✓ Drink fluids\n✓ See a doctor if symptoms persist',
        metadata: {
          urgency: 'medium',
          hasNearbyResources: true,
          language,
          timestamp: new Date().toISOString()
        }
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponse.message,
        timestamp: new Date().toISOString(),
        metadata: mockResponse.metadata
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [language, isOnline]);

  return { messages, sendMessage, isLoading };
};