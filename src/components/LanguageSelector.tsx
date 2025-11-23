import React from 'react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  // ✅ Only keep Hindi and English
  const languages = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' }
  ];

  return (
    <div className="space-y-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
            selectedLanguage === lang.code
              ? 'bg-emerald-100 border-2 border-emerald-500'
              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{lang.flag}</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">{lang.native}</p>
              <p className="text-xs text-gray-500">{lang.name}</p>
            </div>
          </div>
          {selectedLanguage === lang.code && (
            <div className="w-4 h-4 bg-emerald-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
