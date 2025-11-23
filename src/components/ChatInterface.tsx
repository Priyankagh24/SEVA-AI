import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Loader2, MapPin, Phone } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useSpeech } from '../hooks/useSpeech';

interface ChatInterfaceProps {
  language: string;
  isOnline: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language, isOnline }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat(language, isOnline);
  const { speak, isSpeaking } = useSpeech(language);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const getGreeting = () => {
    const greetings: Record<string, string> = {
      en: "Hello! I'm VoiceVitals AI. How can I help you today?",
      hi: "नमस्ते! मैं VoiceVitals AI हूं। मैं आज आपकी कैसे मदद कर सकता हूं?",
      bn: "হ্যালো! আমি VoiceVitals AI। আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
      ta: "வணக்கம்! நான் VoiceVitals AI. இன்று உங்களுக்கு எப்படி உதவ முடியும்?",
      te: "నమస్కారం! నేను VoiceVitals AI. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      mr: "नमस्कार! मी VoiceVitals AI आहे. आज मी तुम्हाला कशी मदत करू शकतो?"
    };
    return greetings[language] || greetings.en;
  };

  return (
    <div className="bg-white rounded-xl shadow-md h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-t-xl">
        <div className="flex items-center justify-between text-white">
          <div>
            <h2 className="font-semibold">Health Assistant</h2>
            <p className="text-xs opacity-90">
              {isOnline ? 'Connected • AI-Powered' : 'Offline Mode • Cached Responses'}
            </p>
          </div>
          <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
            {language.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-gray-600 mb-2">{getGreeting()}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[
                { en: 'Fever symptoms', hi: 'बुखार के लक्षण', icon: '🌡️' },
                { en: 'Child care tips', hi: 'बच्चे की देखभाल', icon: '👶' },
                { en: 'Nearby clinics', hi: 'नजदीकी क्लिनिक', icon: '🏥' }
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(prompt[language as keyof typeof prompt] || prompt.en)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  {prompt.icon} {prompt[language as keyof typeof prompt] || prompt.en}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleSpeak(message.content)}
                    disabled={isSpeaking}
                    className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                  >
                    <Volume2 className="w-4 h-4" />
                    {isSpeaking ? 'Playing...' : 'Listen'}
                  </button>
                  
                  {message.metadata?.hasNearbyResources && (
                    <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                      <MapPin className="w-4 h-4" />
                      Find Clinics
                    </button>
                  )}
                  
                  {message.metadata?.urgency === 'high' && (
                    <button className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700">
                      <Phone className="w-4 h-4" />
                      Emergency: 108
                    </button>
                  )}
                </div>
              )}
              
              <p className="text-xs opacity-70 mt-2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'hi' ? 'अपना स्वास्थ्य प्रश्न टाइप करें...' : 'Type your health question...'}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;