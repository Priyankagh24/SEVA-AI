import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatInterface from './components/ChatInterface';
import LanguageSelector from './components/LanguageSelector';
import VoiceInput from './components/VoiceInput';
import OfflineIndicator from './components/OfflineIndicator';
import ImpactMetrics from './components/ImpactMetrics';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Stethoscope, Globe, Mic } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showMetrics, setShowMetrics] = useState(false);
  const isOnline = useOnlineStatus();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-emerald-200">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">VoiceVitals AI</h1>
                  <p className="text-sm text-gray-600">Your Health Companion in Your Language</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <OfflineIndicator isOnline={isOnline} />
                <button
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                >
                  Impact Metrics
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {showMetrics ? (
            <ImpactMetrics />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Language Selector */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Language</h2>
                  </div>
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                </div>

                {/* Voice Input */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Mic className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Voice Input</h2>
                  </div>
                  <VoiceInput language={selectedLanguage} />
                </div>

                {/* Quick Info */}
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-900 mb-2">💡 How it works</h3>
                  <ul className="text-sm text-emerald-800 space-y-2">
                    <li>✓ Speak or type your health question</li>
                    <li>✓ Works offline in your language</li>
                    <li>✓ Get instant health guidance</li>
                    <li>✓ Find nearby clinics & resources</li>
                  </ul>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <ChatInterface language={selectedLanguage} isOnline={isOnline} />
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600">
              <p>⚠️ For informational purposes only. Not a substitute for professional medical advice.</p>
              <p className="mt-2">
                {isOnline ? '🟢 Online' : '🔴 Offline'} • All data encrypted • Privacy-first
              </p>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;