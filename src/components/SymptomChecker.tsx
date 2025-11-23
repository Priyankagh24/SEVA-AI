import React, { useState } from 'react';
import { X, AlertCircle, Check, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

interface SymptomCheckerProps {
  language: string;
  onClose: () => void;
  onDiagnosis: (diagnosis: string) => void;
}

interface BodyPart {
  id: string;
  name: string;
  nameHi: string;
  x: number;
  y: number;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ language, onClose, onDiagnosis }) => {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [duration, setDuration] = useState('1-2 days');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const bodyParts: BodyPart[] = [
    { id: 'head', name: 'Head', nameHi: 'सिर', x: 50, y: 10 },
    { id: 'chest', name: 'Chest', nameHi: 'छाती', x: 50, y: 30 },
    { id: 'stomach', name: 'Stomach', nameHi: 'पेट', x: 50, y: 45 },
    { id: 'throat', name: 'Throat', nameHi: 'गला', x: 50, y: 20 },
    { id: 'leftArm', name: 'Left Arm', nameHi: 'बायां हाथ', x: 25, y: 35 },
    { id: 'rightArm', name: 'Right Arm', nameHi: 'दायां हाथ', x: 75, y: 35 },
    { id: 'leftLeg', name: 'Left Leg', nameHi: 'बायां पैर', x: 42, y: 70 },
    { id: 'rightLeg', name: 'Right Leg', nameHi: 'दायां पैर', x: 58, y: 70 },
    { id: 'back', name: 'Back', nameHi: 'पीठ', x: 50, y: 40 },
  ];

  const commonSymptoms = [
    { id: 'fever', en: 'Fever', hi: 'बुखार' },
    { id: 'pain', en: 'Pain', hi: 'दर्द' },
    { id: 'cough', en: 'Cough', hi: 'खांसी' },
    { id: 'nausea', en: 'Nausea', hi: 'मतली' },
    { id: 'fatigue', en: 'Fatigue', hi: 'थकान' },
    { id: 'dizziness', en: 'Dizziness', hi: 'चक्कर' },
    { id: 'breathing', en: 'Breathing Difficulty', hi: 'सांस लेने में कठिनाई' },
    { id: 'swelling', en: 'Swelling', hi: 'सूजन' },
  ];

  const toggleBodyPart = (partId: string) => {
    setSelectedParts(prev =>
      prev.includes(partId) ? prev.filter(p => p !== partId) : [...prev, partId]
    );
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId) ? prev.filter(s => s !== symptomId) : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedParts.length === 0 && selectedSymptoms.length === 0) {
      toast.error(language === 'hi' ? 'कृपया लक्षण चुनें' : 'Please select symptoms');
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bodyPartsText = selectedParts
      .map(id => bodyParts.find(p => p.id === id))
      .map(p => language === 'hi' ? p?.nameHi : p?.name)
      .join(', ');

    const symptomsText = selectedSymptoms
      .map(id => commonSymptoms.find(s => s.id === id))
      .map(s => language === 'hi' ? s?.hi : s?.en)
      .join(', ');

    const diagnosis = language === 'hi' 
      ? `🏥 **लक्षण विश्लेषण**\n\n**प्रभावित क्षेत्र:** ${bodyPartsText}\n**लक्षण:** ${symptomsText}\n**गंभीरता:** ${severity === 'severe' ? 'गंभीर' : severity === 'moderate' ? 'मध्यम' : 'हल्का'}\n**अवधि:** ${duration}\n\n**सुझाव:**\n1. ${severity === 'severe' ? '🚨 तुरंत डॉक्टर से मिलें' : 'आराम करें और पानी पिएं'}\n2. बुखार हो तो पैरासिटामोल लें\n3. यदि 2 दिनों में सुधार न हो तो डॉक्टर से परामर्श लें\n\n⚠️ यह केवल सूचना है। कृपया डॉक्टर से परामर्श लें।`
      : `🏥 **Symptom Analysis**\n\n**Affected Areas:** ${bodyPartsText}\n**Symptoms:** ${symptomsText}\n**Severity:** ${severity}\n**Duration:** ${duration}\n\n**Recommendations:**\n1. ${severity === 'severe' ? '🚨 See a doctor immediately' : 'Rest and stay hydrated'}\n2. Take paracetamol if fever present\n3. Consult doctor if no improvement in 2 days\n\n⚠️ This is information only. Please consult a doctor.`;

    setIsAnalyzing(false);
    onDiagnosis(diagnosis);
    toast.success(language === 'hi' ? 'विश्लेषण पूर्ण!' : 'Analysis complete!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-t-2xl text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {language === 'hi' ? 'लक्षण जांचकर्ता' : 'Symptom Checker'}
                </h2>
                <p className="text-sm opacity-90">
                  {language === 'hi' ? 'AI द्वारा संचालित निदान सहायता' : 'AI-Powered Diagnostic Assistant'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Body Map */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'hi' ? '1️⃣ कहाँ दर्द है?' : '1️⃣ Where does it hurt?'}
            </h3>
            
            <div className="relative bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl p-8 aspect-[3/4]">
              {/* Simple Body Outline (SVG) */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Head */}
                <circle cx="50" cy="10" r="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" />
                {/* Neck */}
                <line x1="50" y1="18" x2="50" y2="22" stroke="#9CA3AF" strokeWidth="3" />
                {/* Body */}
                <rect x="42" y="22" width="16" height="30" rx="3" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" />
                {/* Arms */}
                <line x1="42" y1="28" x2="28" y2="40" stroke="#9CA3AF" strokeWidth="3" />
                <line x1="58" y1="28" x2="72" y2="40" stroke="#9CA3AF" strokeWidth="3" />
                {/* Legs */}
                <line x1="46" y1="52" x2="42" y2="75" stroke="#9CA3AF" strokeWidth="3" />
                <line x1="54" y1="52" x2="58" y2="75" stroke="#9CA3AF" strokeWidth="3" />
              </svg>

              {/* Clickable Body Parts */}
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => toggleBodyPart(part.id)}
                  style={{
                    position: 'absolute',
                    left: `${part.x}%`,
                    top: `${part.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedParts.includes(part.id)
                      ? 'bg-red-500 text-white scale-110 shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {language === 'hi' ? part.nameHi : part.name}
                  {selectedParts.includes(part.id) && <Check className="w-3 h-3 inline ml-1" />}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-4 text-center">
              {language === 'hi' 
                ? '💡 प्रभावित क्षेत्रों पर क्लिक करें' 
                : '💡 Click on affected areas'}
            </p>
          </div>

          {/* Symptoms Selection */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'hi' ? '2️⃣ लक्षण चुनें' : '2️⃣ Select Symptoms'}
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {language === 'hi' ? symptom.hi : symptom.en}
                    </span>
                    {selectedSymptoms.includes(symptom.id) && (
                      <Check className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Severity */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'hi' ? '3️⃣ गंभीरता' : '3️⃣ Severity'}
              </h4>
              <div className="flex gap-2">
                {['mild', 'moderate', 'severe'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSeverity(level as any)}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      severity === level
                        ? level === 'severe'
                          ? 'bg-red-500 text-white'
                          : level === 'moderate'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'mild' ? (language === 'hi' ? 'हल्का' : 'Mild') :
                     level === 'moderate' ? (language === 'hi' ? 'मध्यम' : 'Moderate') :
                     (language === 'hi' ? 'गंभीर' : 'Severe')}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'hi' ? '4️⃣ कब से?' : '4️⃣ Duration'}
              </h4>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="few-hours">{language === 'hi' ? 'कुछ घंटे' : 'Few hours'}</option>
                <option value="1-2 days">{language === 'hi' ? '1-2 दिन' : '1-2 days'}</option>
                <option value="3-5 days">{language === 'hi' ? '3-5 दिन' : '3-5 days'}</option>
                <option value="1 week">{language === 'hi' ? '1 सप्ताह' : '1 week'}</option>
                <option value="more">{language === 'hi' ? '1 सप्ताह से अधिक' : 'More than a week'}</option>
              </select>
            </div>

            {/* Analyze Button */}
            <button
              onClick={analyzeSymptoms}
              disabled={isAnalyzing}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {language === 'hi' ? 'विश्लेषण कर रहे हैं...' : 'Analyzing...'}
                </span>
              ) : (
                <>
                  {language === 'hi' ? '🔍 लक्षणों का विश्लेषण करें' : '🔍 Analyze Symptoms'}
                </>
              )}
            </button>

            {/* Warning */}
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                {language === 'hi'
                  ? 'यह केवल सूचनात्मक है। गंभीर लक्षणों के लिए तुरंत डॉक्टर से मिलें।'
                  : 'This is informational only. For serious symptoms, see a doctor immediately.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;