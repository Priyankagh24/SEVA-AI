import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Pill, AlertTriangle, Clock, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface MedicineScannerProps {
  language: string;
  onClose: () => void;
}

const MedicineScanner: React.FC<MedicineScannerProps> = ({ language, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate AI scanning
    setIsScanning(true);
    toast.loading(language === 'hi' ? 'दवा स्कैन कर रहे हैं...' : 'Scanning medicine...');

    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock result (in production, this would call Gemini Vision API)
    const mockResults = [
      {
        name: 'Paracetamol 500mg',
        nameHi: 'पैरासिटामोल 500mg',
        purpose: 'Pain relief and fever reduction',
        purposeHi: 'दर्द से राहत और बुखार कम करना',
        dosage: 'Take 1 tablet every 6 hours',
        dosageHi: 'हर 6 घंटे में 1 गोली लें',
        maxDaily: '4 tablets per day (2000mg)',
        maxDailyHi: 'दिन में 4 गोलियां (2000mg)',
        sideEffects: ['Nausea (rare)', 'Skin rash (rare)', 'Liver damage (overdose)'],
        sideEffectsHi: ['मतली (दुर्लभ)', 'त्वचा पर दाने (दुर्लभ)', 'लीवर क्षति (अधिक खुराक)'],
        warnings: ['Do not exceed 4g per day', 'Avoid alcohol', 'Consult doctor if pregnant'],
        warningsHi: ['प्रति दिन 4g से अधिक न लें', 'शराब से बचें', 'गर्भवती हों तो डॉक्टर से परामर्श लें'],
        color: 'blue'
      },
      {
        name: 'Amoxicillin 250mg',
        nameHi: 'एमोक्सिसिलिन 250mg',
        purpose: 'Antibiotic for bacterial infections',
        purposeHi: 'बैक्टीरियल संक्रमण के लिए एंटीबायोटिक',
        dosage: 'Take 1 capsule 3 times daily',
        dosageHi: 'दिन में 3 बार 1 कैप्सूल लें',
        maxDaily: 'Complete full course as prescribed',
        maxDailyHi: 'निर्धारित पूरा कोर्स पूरा करें',
        sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
        sideEffectsHi: ['दस्त', 'मतली', 'त्वचा पर दाने'],
        warnings: ['Complete full course', 'Take with food', 'Allergic to penicillin? Avoid!'],
        warningsHi: ['पूरा कोर्स पूरा करें', 'खाने के साथ लें', 'पेनिसिलिन से एलर्जी? बचें!'],
        color: 'red'
      }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    setScanResult(result);
    setIsScanning(false);
    toast.dismiss();
    toast.success(language === 'hi' ? 'स्कैन पूर्ण!' : 'Scan complete!');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-t-2xl text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Pill className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {language === 'hi' ? 'दवा स्कैनर' : 'Medicine Scanner'}
                </h2>
                <p className="text-sm opacity-90">
                  {language === 'hi' ? 'AI से दवा की जानकारी पढ़ें' : 'Read medicine info with AI'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!scanResult ? (
            <>
              {/* Upload Area */}
              <div className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-pink-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg" />
                    {isScanning && (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                        <span className="text-gray-600 font-medium">
                          {language === 'hi' ? 'AI विश्लेषण कर रहा है...' : 'AI analyzing...'}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-20 h-20 mx-auto text-gray-400" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {language === 'hi' ? 'दवा की फोटो अपलोड करें' : 'Upload Medicine Photo'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'hi' 
                          ? 'दवा की पट्टी या पर्चे की स्पष्ट तस्वीर लें'
                          : 'Take a clear photo of medicine strip or prescription'}
                      </p>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={triggerFileInput}
                        className="px-6 py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors flex items-center space-x-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>{language === 'hi' ? 'फोटो चुनें' : 'Choose Photo'}</span>
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-blue-600 font-semibold mb-2">📸 {language === 'hi' ? 'अच्छी रोशनी' : 'Good Lighting'}</div>
                  <p className="text-sm text-blue-800">
                    {language === 'hi' ? 'स्पष्ट तस्वीर के लिए अच्छी रोशनी में फोटो लें' : 'Take photo in good lighting for clear text'}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-green-600 font-semibold mb-2">🎯 {language === 'hi' ? 'फोकस करें' : 'Focus Well'}</div>
                  <p className="text-sm text-green-800">
                    {language === 'hi' ? 'टेक्स्ट स्पष्ट और फोकस में हो' : 'Ensure text is clear and in focus'}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-purple-600 font-semibold mb-2">📝 {language === 'hi' ? 'पूरी जानकारी' : 'Full Info'}</div>
                  <p className="text-sm text-purple-800">
                    {language === 'hi' ? 'दवा का नाम और खुराक दिखाई दे' : 'Show medicine name and dosage'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Scan Results */}
              <div className="space-y-6">
                {/* Medicine Name */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-xl text-white">
                  <div className="flex items-center space-x-3 mb-2">
                    <Pill className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">
                      {language === 'hi' ? scanResult.nameHi : scanResult.name}
                    </h3>
                  </div>
                  <p className="text-pink-100">
                    {language === 'hi' ? scanResult.purposeHi : scanResult.purpose}
                  </p>
                </div>

                {/* Dosage */}
                <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-bold text-blue-900">
                      {language === 'hi' ? 'खुराक निर्देश' : 'Dosage Instructions'}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-blue-900 font-medium">
                      💊 {language === 'hi' ? scanResult.dosageHi : scanResult.dosage}
                    </p>
                    <p className="text-blue-800">
                      ⚠️ {language === 'hi' ? scanResult.maxDailyHi : scanResult.maxDaily}
                    </p>
                  </div>
                </div>

                {/* Side Effects */}
                <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <h4 className="text-lg font-bold text-yellow-900">
                      {language === 'hi' ? 'संभावित दुष्प्रभाव' : 'Possible Side Effects'}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {(language === 'hi' ? scanResult.sideEffectsHi : scanResult.sideEffects).map((effect: string, idx: number) => (
                      <li key={idx} className="text-yellow-900 flex items-start space-x-2">
                        <span>•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warnings */}
                <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-6 h-6 text-red-600" />
                    <h4 className="text-lg font-bold text-red-900">
                      {language === 'hi' ? '⚠️ महत्वपूर्ण चेतावनियां' : '⚠️ Important Warnings'}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {(language === 'hi' ? scanResult.warningsHi : scanResult.warnings).map((warning: string, idx: number) => (
                      <li key={idx} className="text-red-900 flex items-start space-x-2">
                        <span>🚫</span>
                        <span className="font-medium">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setScanResult(null);
                      setImagePreview(null);
                    }}
                    className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                  >
                    {language === 'hi' ? '🔄 नई स्कैन' : '🔄 Scan Another'}
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors"
                  >
                    {language === 'hi' ? '✅ समझ गया' : '✅ Got It'}
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>{language === 'hi' ? '⚠️ अस्वीकरण:' : '⚠️ Disclaimer:'}</strong>{' '}
                    {language === 'hi'
                      ? 'यह AI द्वारा उत्पन्न जानकारी है। कृपया पर्चे और डॉक्टर की सलाह का पालन करें।'
                      : 'This is AI-generated information. Please follow prescription and doctor advice.'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineScanner;