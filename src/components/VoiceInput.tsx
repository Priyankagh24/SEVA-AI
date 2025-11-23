import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface VoiceInputProps {
  language: string;
  onVoiceResult?: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ language, onVoiceResult }) => {
  const [transcript, setTranscript] = useState('');

  const { isListening, startListening, stopListening, isSupported } = useVoiceInput({
    language,
    onResult: (text) => {
      setTranscript(text);
      onVoiceResult?.(text);
      console.log('Voice input:', text);
    },
    onError: (error) => {
      console.error('Voice input error:', error);
    }
  });

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Voice input not supported in this browser. Please use Chrome.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`w-full p-6 rounded-xl transition-all ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-emerald-500 hover:bg-emerald-600'
        } text-white font-medium`}
      >
        <div className="flex flex-col items-center space-y-2">
          {isListening ? (
            <>
              <MicOff className="w-8 h-8" />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <Mic className="w-8 h-8" />
              <span>Start Speaking</span>
            </>
          )}
        </div>
      </button>

      {transcript && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">You said:</p>
          <p className="text-gray-900">{transcript}</p>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        Tip: Click and speak clearly in {language === 'hi' ? 'Hindi' : 'your language'}
      </div>
    </div>
  );
};

export default VoiceInput;