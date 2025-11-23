import { useState, useCallback, useEffect } from 'react';

interface VoiceInputOptions {
  language: string;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
}

export const useVoiceInput = ({ language, onResult, onError }: VoiceInputOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      const langMap: Record<string, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        bn: 'bn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        mr: 'mr-IN'
      };
      
      recognitionInstance.lang = langMap[language] || 'en-US';
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          onResult(transcriptText);
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        onError?.(event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported: recognition !== null
  };
};