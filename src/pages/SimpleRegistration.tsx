import React, { useState } from 'react';
import { User, Mic, ArrowRight, MicOff, Heart, UserPlus, HelpCircle, CheckCircle, Sparkles, Star, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface SimpleRegistrationProps {
  onComplete: (userData: { name: string; village: string; language: string; registeredAt: string }) => void;
}

const SimpleRegistration: React.FC<SimpleRegistrationProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [isListening, setIsListening] = useState<'name' | 'village' | null>(null);
  const [mode, setMode] = useState<'welcome' | 'register'>('welcome');
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
   { code: 'hi', name: 'हिंदी', flag: '🇮🇳', display: 'Hindi' },
    { code: 'en', name: 'English', flag: '🇬🇧', display: 'English' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳', display: 'Marathi' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', display: 'Bengali' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', display: 'Tamil' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳', display: 'Telugu' }
  ];

  const handleStartClick = () => {
    const storedUser = localStorage.getItem('voicevitals_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        toast.success(`🎉 फिर से स्वागत है ${userData.name}!`);
        setTimeout(() => onComplete(userData), 1000);
      } catch {
        localStorage.removeItem('voicevitals_user');
        setMode('register');
      }
    } else {
      setMode('register');
    }
  };

  const handleVoiceInput = (field: 'name' | 'village') => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(field);
        toast.success('🎤 सुन रहे हैं...');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        field === 'name' ? setName(transcript) : setVillage(transcript);
        setIsListening(null);
        toast.success('✅ सुन लिया!');
      };

      recognition.onerror = () => {
        setIsListening(null);
        toast.error('फिर से कोशिश करें');
      };

      recognition.onend = () => setIsListening(null);

      recognition.start();
    } else {
      toast.error('आवाज़ काम नहीं कर रही');
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return toast.error('कृपया अपना नाम बताएं');
    if (!selectedLanguage) return toast.error('कृपया अपनी भाषा चुनें');

    const userData = {
      name: name.trim(),
      village: village.trim() || 'जानकारी नहीं',
      language: selectedLanguage,
      registeredAt: new Date().toISOString(),
    };

    localStorage.setItem('voicevitals_user', JSON.stringify(userData));
    toast.success(`🎉 स्वागत है ${name}!`);
    setTimeout(() => onComplete(userData), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Welcome Screen */}
        {mode === 'welcome' && (
          <div className="animate-fade-in grid lg:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mb-4 animate-pulse-slow shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-black text-gray-900 mb-2">SevaAI</h1>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  आपका Seva साथी
                </p>
                <div className="flex items-center justify-center space-x-2 text-yellow-600">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span className="font-bold">4.9 रेटिंग</span>
                  <Star className="w-5 h-5 fill-yellow-500" />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[{icon:'🎤',title:'आवाज़ से बात करें',desc:'हिंदी में बोलें, लिखना नहीं पड़ेगा'},
                  {icon:'🏥',title:'स्वास्थ्य सलाह',desc:'घर बैठे डॉक्टर की तरह सलाह'},
                  {icon:'🌾',title:'खेती की जानकारी',desc:'फसल, गाय-बकरी की देखभाल'},
                  {icon:'📚',title:'पढ़ाई में मदद',desc:'बच्चों के सवालों के जवाब'},
                  {icon:'📱',title:'सरकारी योजना',desc:'आपके लिए कौनसी योजना है'},
                  {icon:'🆓',title:'बिल्कुल मुफ्त',desc:'कोई पैसा नहीं लगेगा'}
                ].map((f,i)=>(
                  <div key={i} className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-100 transform hover:scale-105 transition-transform">
                    <div className="text-3xl flex-shrink-0">{f.icon}</div>
                    <div>
                      <p className="font-bold text-gray-900">{f.title}</p>
                      <p className="text-sm text-gray-600">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-green-700 font-bold">
                  <Shield className="w-5 h-5" />
                  <span>50 लाख+ लोग भरोसा करते हैं</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 lg:p-10 text-white space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <HelpCircle className="w-5 h-5" />
                <span className="font-bold">कैसे इस्तेमाल करें?</span>
              </div>
              <h2 className="text-3xl font-black mb-3">बस 3 आसान स्टेप!</h2>
              <p className="text-lg opacity-90">बिल्कुल सरल, कोई भी कर सकता है</p>

              {/* Steps */}
              <div className="space-y-6">
                {[{step:'1',title:'अपना नाम बताएं',desc:'टाइप करें या माइक बटन दबाकर बोलें',icon:'👤',color:'bg-pink-500'},
                  {step:'2',title:'अपना सवाल पूछें',desc:'जो भी पूछना हो, हिंदी में बोलें',icon:'🎤',color:'bg-green-500'},
                  {step:'3',title:'जवाब सुनें',desc:'SevaAI आपको आसान भाषा में बताएगा',icon:'💡',color:'bg-yellow-500'}
                ].map((s,i)=>(
                  <div key={i} className="relative">
                    <div className={`flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 transform hover:scale-105 transition-transform`}>
                      <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>{s.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-black">{s.step}</div>
                          <h3 className="text-xl font-bold">{s.title}</h3>
                        </div>
                        <p className="text-white/80">{s.desc}</p>
                      </div>
                    </div>
                    {i<2 && <div className="absolute left-8 top-[90px] w-0.5 h-6 bg-white/30"></div>}
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartClick}
                className="w-full bg-white text-purple-600 py-5 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all flex items-center justify-center space-x-3 group"
              >
                <span>🚀 शुरू करें</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>

              <p className="text-center mt-4 text-white/80 text-sm">📱 सिर्फ 2 मिनट लगेंगे</p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {mode === 'register' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 animate-fade-in space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
                  <UserPlus className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {step === 1 && 'आपका नाम क्या है? 👤'}
                  {step === 2 && 'आप कहाँ रहते हैं? 🏘️'}
                  {step === 3 && 'आपकी भाषा चुनें 🌐'}
                </h2>
                <p className="text-lg text-gray-600">
                  {step === 1 && 'टाइप करें या 🎤 दबाकर बोलें'}
                  {step === 2 && 'गाँव या शहर का नाम (ज़रूरी नहीं)'}
                  {step === 3 && 'जिस भाषा में बात करना चाहते हैं'}
                </p>
              </div>

              {/* Step Forms */}
              {step === 1 && (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="अपना नाम लिखें..."
                    className="w-full px-6 py-5 text-2xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-center font-semibold"
                    autoFocus
                  />
                  <button
                    onClick={()=>handleVoiceInput('name')}
                    disabled={isListening!==null}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center space-x-3 font-bold text-xl transition-all ${isListening==='name'?'bg-red-500 text-white animate-pulse':'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'}`}
                  >
                    {isListening==='name'?<>
                      <MicOff className="w-8 h-8"/> <span>🔴 सुन रहे हैं...</span>
                    </>:<>
                      <Mic className="w-8 h-8"/> <span>🎤 माइक से बोलें</span>
                    </>}
                  </button>
                  {name.trim() && <button onClick={()=>setStep(2)} className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-xl">आगे बढ़ें</button>}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={village}
                    onChange={(e)=>setVillage(e.target.value)}
                    placeholder="गाँव या शहर का नाम..."
                    className="w-full px-6 py-5 text-2xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-center font-semibold"
                    autoFocus
                  />
                  <button
                    onClick={()=>handleVoiceInput('village')}
                    disabled={isListening!==null}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center space-x-3 font-bold text-xl transition-all ${isListening==='village'?'bg-red-500 text-white animate-pulse':'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'}`}
                  >
                    {isListening==='village'?<>
                      <MicOff className="w-8 h-8"/> <span>🔴 सुन रहे हैं...</span>
                    </>:<>
                      <Mic className="w-8 h-8"/> <span>🎤 माइक से बोलें</span>
                    </>}
                  </button>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center text-blue-800 font-semibold">
                    💡 यह ज़रूरी नहीं है। छोड़कर आगे बढ़ सकते हैं।
                  </div>
                  <div className="flex gap-3">
                    <button onClick={()=>setStep(1)} className="flex-1 py-4 bg-gray-200 rounded-2xl font-bold text-lg">← पीछे</button>
                    <button onClick={()=>setStep(3)} className="flex-1 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center space-x-3">आगे बढ़ें <ArrowRight className="w-7 h-7"/></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {languages.map(lang=>(
                      <button key={lang.code} onClick={()=>setSelectedLanguage(lang.code)} className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${selectedLanguage===lang.code?'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 text-white shadow-xl':'bg-white border-gray-300 hover:border-blue-400'}`}>
                        <div className="text-5xl mb-3">{lang.flag}</div>
                        <div className="text-2xl font-bold mb-1">{lang.name}</div>
                        <div className="text-sm">{lang.display}</div>
                        {selectedLanguage===lang.code && <CheckCircle className="w-8 h-8 mx-auto mt-2 text-white"/>}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={()=>setStep(2)} className="flex-1 py-4 bg-gray-200 rounded-2xl font-bold text-lg">← पीछे</button>
                    <button onClick={handleSubmit} disabled={!selectedLanguage} className="flex-1 py-6 bg-gradient-to-r from-green-600 to-emerald-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center space-x-3 disabled:cursor-not-allowed">✅ शुरू करें <ArrowRight className="w-8 h-8"/></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        @keyframes pulse-slow {0%,100%{transform:scale(1);}50%{transform:scale(1.05);}}
        .animate-fade-in {animation:fade-in 0.5s ease-out;}
        .animate-pulse-slow {animation:pulse-slow 2s ease-in-out infinite;}
      `}</style>
    </div>
  );
};

export default SimpleRegistration;
