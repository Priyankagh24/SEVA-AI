import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Phone, MapPin, Heart, Zap, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

interface EmergencyModeProps {
  language: string;
  onClose: () => void;
}

const EmergencyMode: React.FC<EmergencyModeProps> = ({ language, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [emergencyCalled, setEmergencyCalled] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    // Get location immediately
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Location error:', error);
          setUserLocation({ lat: 20.2961, lng: 85.8245 });
        }
      );
    }

    // Countdown timer
    if (!isCancelled && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isCancelled) {
      triggerEmergency();
    }
  }, [countdown, isCancelled]);

  const triggerEmergency = () => {
    setEmergencyCalled(true);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }

    toast.success(language === 'hi' ? '🚨 आपातकालीन सेवाओं को सूचित किया गया!' : '🚨 Emergency services notified!');
  };

  const cancelEmergency = () => {
    setIsCancelled(true);
    toast.success(language === 'hi' ? 'रद्द किया गया' : 'Cancelled');
    setTimeout(() => onClose(), 1000);
  };

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const shareLocation = () => {
    if (userLocation) {
      const message = language === 'hi' 
        ? `🚨 आपातकाल! मुझे मदद चाहिए। मेरा स्थान: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
        : `🚨 EMERGENCY! I need help. My location: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Emergency Alert',
          text: message
        }).catch(() => {
          navigator.clipboard.writeText(message);
          toast.success(language === 'hi' ? 'स्थान कॉपी किया गया!' : 'Location copied!');
        });
      } else {
        navigator.clipboard.writeText(message);
        toast.success(language === 'hi' ? 'स्थान कॉपी किया गया!' : 'Location copied!');
      }
    }
  };

  const emergencyServices = [
    { number: '108', label: language === 'hi' ? 'एम्बुलेंस (मुफ्त)' : 'Ambulance (Free)', icon: '🚑' },
    { number: '102', label: language === 'hi' ? 'राष्ट्रीय एम्बुलेंस सेवा' : 'National Ambulance Service', icon: '🚑' },
    { number: '104', label: language === 'hi' ? 'राज्य स्वास्थ्य हेल्पलाइन' : 'State Health Helpline', icon: '📞' },
    { number: '1800-180-1104', label: language === 'hi' ? 'राष्ट्रीय स्वास्थ्य हेल्पलाइन' : 'National Health Helpline', icon: '📞' },
    { number: '100', label: language === 'hi' ? 'पुलिस' : 'Police', icon: '🚓' },
    { number: '101', label: language === 'hi' ? 'फायर ब्रिगेड' : 'Fire Brigade', icon: '🚒' }
  ];

  return (
    <div className="fixed inset-0 bg-red-900/95 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        {!emergencyCalled ? (
          <>
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white text-center">
              <AlertTriangle className="w-20 h-20 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold mb-2">
                {language === 'hi' ? '🚨 आपातकालीन मोड' : '🚨 EMERGENCY MODE'}
              </h2>
              <p className="text-red-100 text-lg mb-6">
                {language === 'hi' 
                  ? 'आपातकालीन सेवाओं को कॉल कर रहे हैं...'
                  : 'Calling emergency services...'}
              </p>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (countdown / 5)}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold">{countdown}</span>
                </div>
              </div>

              <button
                onClick={cancelEmergency}
                className="w-full py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                {language === 'hi' ? '❌ रद्द करें' : '❌ CANCEL'}
              </button>
            </div>

            <div className="p-6">
              <p className="text-center text-gray-600 text-sm">
                {language === 'hi'
                  ? 'यदि यह गलती से सक्रिय हो गया है तो रद्द करें पर क्लिक करें'
                  : 'Click CANCEL if this was activated by mistake'}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="w-8 h-8 animate-pulse" />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {language === 'hi' ? 'आपातकालीन मोड सक्रिय' : 'Emergency Mode Active'}
                    </h2>
                    <p className="text-sm opacity-90">
                      {language === 'hi' ? 'तुरंत सहायता' : 'Immediate Assistance'}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>{language === 'hi' ? 'आपातकालीन नंबर' : 'Emergency Numbers'}</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {emergencyServices.map((service) => (
                    <button
                      key={service.number}
                      onClick={() => callEmergency(service.number)}
                      className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div className="text-left">
                          <div className="font-bold text-gray-900">{service.number}</div>
                          <div className="text-sm text-gray-600">{service.label}</div>
                        </div>
                      </div>
                      <Phone className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span>{language === 'hi' ? 'त्वरित क्रियाएं' : 'Quick Actions'}</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={shareLocation}
                    className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-all text-center"
                  >
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium text-gray-900 text-sm">
                      {language === 'hi' ? 'स्थान साझा करें' : 'Share Location'}
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      if (userLocation) {
                        window.open(`https://www.google.com/maps/search/hospital/@${userLocation.lat},${userLocation.lng},15z`, '_blank');
                      }
                    }}
                    className="p-4 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-all text-center"
                  >
                    <Navigation className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-medium text-gray-900 text-sm">
                      {language === 'hi' ? 'निकटतम अस्पताल' : 'Nearest Hospital'}
                    </div>
                  </button>
                </div>
              </div>

              {userLocation && (
                <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span>{language === 'hi' ? 'आपका स्थान' : 'Your Location'}</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'hi' ? 'अक्षांश:' : 'Latitude:'} {userLocation.lat.toFixed(6)}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'hi' ? 'देशांतर:' : 'Longitude:'} {userLocation.lng.toFixed(6)}
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    {language === 'hi' ? '📍 मानचित्र में खोलें' : '📍 Open in Maps'}
                  </a>
                </div>
              )}

              <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl">
                <h4 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>{language === 'hi' ? 'प्राथमिक चिकित्सा युक्तियाँ' : 'First Aid Tips'}</span>
                </h4>
                <ul className="space-y-2 text-sm text-yellow-900">
                  <li className="flex items-start space-x-2">
                    <span>1.</span>
                    <span>{language === 'hi' ? 'शांत रहें और गहरी सांस लें' : 'Stay calm and breathe deeply'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>2.</span>
                    <span>{language === 'hi' ? 'यदि चोट लगी है तो खून बहना रोकें' : 'Stop bleeding if injured'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>3.</span>
                    <span>{language === 'hi' ? 'सुरक्षित स्थान पर जाएं' : 'Move to a safe location'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span>4.</span>
                    <span>{language === 'hi' ? 'यदि बेहोश हो तो CPR दें (प्रशिक्षित हों तो)' : 'Give CPR if unconscious (if trained)'}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl">
                <p className="text-sm text-red-800">
                  <strong>⚠️ {language === 'hi' ? 'महत्वपूर्ण:' : 'Important:'}</strong>{' '}
                  {language === 'hi'
                    ? 'यदि स्थिति गंभीर है तो तुरंत 108 पर कॉल करें। यह ऐप पेशेवर चिकित्सा सहायता का विकल्प नहीं है।'
                    : 'Call 108 immediately if situation is critical. This app is not a substitute for professional medical help.'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmergencyMode;