import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Star, Sparkles, X } from 'lucide-react';

interface VideoLandingProps {
  onComplete: () => void;
}

const VideoLanding: React.FC<VideoLandingProps> = ({ onComplete }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showSolutions, setShowSolutions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const problems = [
    { text: 'गाँव में अच्छे संसाधन नहीं हैं?', icon: '🏥', color: 'from-red-500 to-pink-500' },
    { text: 'जरूरी खर्च बहुत ज़्यादा है?', icon: '💰', color: 'from-orange-500 to-amber-500' },
    { text: 'अपनी भाषा में जानकारी नहीं मिलती?', icon: '🗣️', color: 'from-blue-500 to-cyan-500' },
    { text: 'दस्तावेज़ या पर्ची समझ नहीं आती?', icon: '📋', color: 'from-purple-500 to-pink-500' }
  ];

  const solutions = [
    { icon: '🎤', text: 'अपनी भाषा में बोलें और तुरंत जवाब पाएं' },
    { icon: '🏥', text: 'अपनी सेहत की जानकारी पाएं' },
    { icon: '🌾', text: 'गाय, बकरी और फसल की सुरक्षा करें' },
    { icon: '👶', text: 'बच्चों के पढ़ाई में मदद' },
    { icon: '💻', text: 'ऑनलाइन ट्यूशन देकर पैसा कमाएँ' },
    { icon: '📄', text: 'दस्तावेज़ खोने पर शिकायत दर्ज करें' },
    { icon: '📚', text: 'किताबें खरीदने में पैसा बचाएँ' },
    { icon: '📱', text: 'दस्तावेज़ हमेशा फोन में रखें' },
    { icon: '🛠️', text: 'रोज़मर्रा की समस्याओं का हल पाएं' },
    { icon: '🆓', text: 'पूरी तरह मुफ्त और सुरक्षित' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content - Single Screen */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
        <div className="max-w-7xl w-full">
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* LEFT SIDE - Hero Content */}
            <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              
              {/* Logo Badge */}
              <div className="inline-flex items-center space-x-3 bg-white rounded-full px-5 py-2 shadow-lg border-2 border-purple-100">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SevaAI
                </span>
                <div className="flex items-center space-x-1 bg-yellow-50 rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-yellow-700">4.9</span>
                </div>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
                  आपका<br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Seva साथी
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 font-semibold leading-relaxed">
                  🎤 बोलें, पूछें, जानें<br />
                  <span className="text-lg text-gray-600">हर तरह की मदद के लिए आपका दोस्त</span>
                </p>
              </div>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-2">
                {['✅ मुफ्त', '🔒 सुरक्षित', '🌐 कई भाषाएं', '⚡ तुरंत मदद'].map((feature, i) => (
                  <div 
                    key={i}
                    className="bg-white px-4 py-2 rounded-full shadow-md border-2 border-gray-100 font-semibold text-sm text-gray-800"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              {/* Solutions Preview Button */}
              <button
                onClick={() => setShowSolutions(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-3"
              >
                <span>✨ 10+ सेवाएँ देखें</span>
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Main CTA */}
              <button
                onClick={onComplete}
                className="group relative w-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center space-x-3">
                  <span className="text-white font-bold text-xl">🚀 अभी शुरू करें</span>
                  <ArrowRight className="w-7 h-7 text-white group-hover:translate-x-2 transition-transform" />
                </div>
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold">50 लाख+ लोग इस्तेमाल कर रहे हैं</span>
              </div>
            </div>

            {/* RIGHT SIDE - Problem Showcase */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              
              {/* Problem Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 border-4 border-white relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${problems[currentProblem].color} opacity-10 transition-all duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      😟 क्या आपको भी ये परेशानी है?
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                  </div>

                  <div className="relative h-52 flex items-center justify-center">
                    {problems.map((problem, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                          currentProblem === index
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-75'
                        }`}
                      >
                        <div className="text-7xl mb-4 animate-bounce-slow">{problem.icon}</div>
                        <p className="text-xl font-bold text-gray-800 text-center px-4">
                          {problem.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-2 mt-4">
                    {problems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProblem(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentProblem === index
                            ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'w-2 bg-gray-300'
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: '🏥', text: 'स्वास्थ्य' },
                  { icon: '🌾', text: 'खेती' },
                  { icon: '📚', text: 'शिक्षा' },
                  { icon: '🛠️', text: 'रोज़मर्रा' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-2 shadow-md border-2 border-gray-100 text-center transform hover:scale-105 transition-transform">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-sm font-bold text-gray-800">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Modal */}
      {showSolutions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
              <button
                onClick={() => setShowSolutions(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-black mb-2">✨ SevaAI की सेवाएँ</h2>
              <p className="text-lg opacity-90">घर बैठे ये सब कर सकते हैं!</p>
            </div>

            {/* Solutions Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
              <div className="grid md:grid-cols-2 gap-4">
                {solutions.map((solution, i) => (
                  <div 
                    key={i}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border-2 border-blue-100 hover:border-purple-300 transition-all transform hover:scale-105 hover:shadow-lg"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl flex-shrink-0">{solution.icon}</div>
                      <div>
                        <div className="text-lg font-bold text-blue-900 mb-1">
                          {i + 1}. {solution.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA in Modal */}
              <button
                onClick={() => {
                  setShowSolutions(false);
                  onComplete();
                }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-3"
              >
                <span>🚀 अब शुरू करें</span>
                <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(20px,-50px) scale(1.1); }
          50% { transform: translate(-20px,20px) scale(0.9); }
          75% { transform: translate(50px,50px) scale(1.05); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default VideoLanding;