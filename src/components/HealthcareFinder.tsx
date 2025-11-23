import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, Navigation, Star, Clock, DollarSign, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface HealthcareFinderProps {
  language: string;
  onClose: () => void;
}

interface HealthcarePlace {
  id: string;
  name: string;
  nameHi: string;
  type: 'hospital' | 'clinic' | 'pharmacy';
  distance: number;
  rating: number;
  reviews: number;
  address: string;
  addressHi: string;
  phone: string;
  isOpen: boolean;
  openHours: string;
  services: string[];
  servicesHi: string[];
  cost: 'free' | 'low' | 'medium' | 'high';
  lat: number;
  lng: number;
}

const HealthcareFinder: React.FC<HealthcareFinderProps> = ({ language, onClose }) => {
  const [places, setPlaces] = useState<HealthcarePlace[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'hospital' | 'clinic' | 'pharmacy'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState(5); // km

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          loadNearbyPlaces(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Location error:', error);
          toast.error(language === 'hi' ? 'स्थान एक्सेस अनुमति दें' : 'Please allow location access');
          // Use mock location for demo
          setUserLocation({ lat: 20.2961, lng: 85.8245 }); // Bhubaneswar
          loadNearbyPlaces(20.2961, 85.8245);
        }
      );
    } else {
      // Mock location
      setUserLocation({ lat: 20.2961, lng: 85.8245 });
      loadNearbyPlaces(20.2961, 85.8245);
    }
  }, []);

  const loadNearbyPlaces = async (lat: number, lng: number) => {
    setIsLoading(true);
    
    // Simulate API call - in production, use Google Places API or government health database
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockPlaces: HealthcarePlace[] = [
      {
        id: '1',
        name: 'Capital Hospital',
        nameHi: 'कैपिटल अस्पताल',
        type: 'hospital',
        distance: 1.2,
        rating: 4.5,
        reviews: 1250,
        address: 'Unit 6, Bhubaneswar',
        addressHi: 'यूनिट 6, भुवनेश्वर',
        phone: '0674-2301234',
        isOpen: true,
        openHours: '24/7',
        services: ['Emergency', 'ICU', 'Surgery', 'Cardiology'],
        servicesHi: ['आपातकालीन', 'आईसीयू', 'शल्य चिकित्सा', 'हृदय रोग'],
        cost: 'medium',
        lat: lat + 0.01,
        lng: lng + 0.01
      },
      {
        id: '2',
        name: 'Apollo Hospitals',
        nameHi: 'अपोलो अस्पताल',
        type: 'hospital',
        distance: 2.8,
        rating: 4.8,
        reviews: 3420,
        address: 'Sainik School Road, Bhubaneswar',
        addressHi: 'सैनिक स्कूल रोड, भुवनेश्वर',
        phone: '0674-6660101',
        isOpen: true,
        openHours: '24/7',
        services: ['Emergency', 'ICU', 'Cancer Care', 'Neurology'],
        servicesHi: ['आपातकालीन', 'आईसीयू', 'कैंसर देखभाल', 'न्यूरोलॉजी'],
        cost: 'high',
        lat: lat + 0.025,
        lng: lng - 0.015
      },
      {
        id: '3',
        name: 'City Health Clinic',
        nameHi: 'सिटी हेल्थ क्लिनिक',
        type: 'clinic',
        distance: 0.5,
        rating: 4.2,
        reviews: 580,
        address: 'Saheed Nagar, Bhubaneswar',
        addressHi: 'शहीद नगर, भुवनेश्वर',
        phone: '0674-2543210',
        isOpen: true,
        openHours: '9 AM - 9 PM',
        services: ['General Medicine', 'Pediatrics', 'Vaccination'],
        servicesHi: ['सामान्य चिकित्सा', 'बाल रोग', 'टीकाकरण'],
        cost: 'low',
        lat: lat + 0.005,
        lng: lng + 0.005
      },
      {
        id: '4',
        name: 'Government PHC',
        nameHi: 'सरकारी प्राथमिक स्वास्थ्य केंद्र',
        type: 'clinic',
        distance: 0.8,
        rating: 3.8,
        reviews: 320,
        address: 'Nayapalli, Bhubaneswar',
        addressHi: 'नयापल्ली, भुवनेश्वर',
        phone: '0674-2300000',
        isOpen: true,
        openHours: '8 AM - 4 PM',
        services: ['Free Consultation', 'Basic Tests', 'Vaccination'],
        servicesHi: ['मुफ्त परामर्श', 'बुनियादी परीक्षण', 'टीकाकरण'],
        cost: 'free',
        lat: lat - 0.007,
        lng: lng + 0.008
      },
      {
        id: '5',
        name: 'MediPlus Pharmacy',
        nameHi: 'मेडीप्लस फार्मेसी',
        type: 'pharmacy',
        distance: 0.3,
        rating: 4.6,
        reviews: 890,
        address: 'Master Canteen Square',
        addressHi: 'मास्टर कैंटीन स्क्वायर',
        phone: '0674-2345678',
        isOpen: true,
        openHours: '8 AM - 11 PM',
        services: ['Medicines', 'Medical Supplies', 'Home Delivery'],
        servicesHi: ['दवाएं', 'चिकित्सा आपूर्ति', 'घर डिलीवरी'],
        cost: 'low',
        lat: lat + 0.003,
        lng: lng - 0.003
      },
      {
        id: '6',
        name: 'Sum Hospital',
        nameHi: 'सम अस्पताल',
        type: 'hospital',
        distance: 4.5,
        rating: 4.3,
        reviews: 2100,
        address: 'Kalinga Nagar, Bhubaneswar',
        addressHi: 'कलिंग नगर, भुवनेश्वर',
        phone: '0674-2386622',
        isOpen: true,
        openHours: '24/7',
        services: ['Emergency', 'Trauma Care', 'Orthopedics', 'Maternity'],
        servicesHi: ['आपातकालीन', 'आघात देखभाल', 'हड्डी रोग', 'प्रसूति'],
        cost: 'medium',
        lat: lat - 0.04,
        lng: lng + 0.03
      }
    ];

    setPlaces(mockPlaces);
    setIsLoading(false);
    toast.success(language === 'hi' ? `${mockPlaces.length} स्थान मिले` : `Found ${mockPlaces.length} places`);
  };

  const filteredPlaces = places.filter(place => 
    selectedType === 'all' || place.type === selectedType
  );

  const getCostBadge = (cost: string) => {
    const badges = {
      free: { text: language === 'hi' ? 'मुफ्त' : 'Free', color: 'bg-green-100 text-green-700' },
      low: { text: '₹', color: 'bg-blue-100 text-blue-700' },
      medium: { text: '₹₹', color: 'bg-yellow-100 text-yellow-700' },
      high: { text: '₹₹₹', color: 'bg-red-100 text-red-700' }
    };
    return badges[cost as keyof typeof badges];
  };

  const getTypeIcon = (type: string) => {
    return type === 'hospital' ? '🏥' : type === 'clinic' ? '🩺' : '💊';
  };

  const openInMaps = (place: HealthcarePlace) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const callPlace = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {language === 'hi' ? 'स्वास्थ्य सेवा खोजें' : 'Healthcare Finder'}
                </h2>
                <p className="text-sm opacity-90">
                  {language === 'hi' ? 'आस-पास के अस्पताल और क्लिनिक' : 'Nearby hospitals and clinics'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { id: 'all', label: language === 'hi' ? 'सभी' : 'All', icon: '🏥' },
              { id: 'hospital', label: language === 'hi' ? 'अस्पताल' : 'Hospitals', icon: '🏥' },
              { id: 'clinic', label: language === 'hi' ? 'क्लिनिक' : 'Clinics', icon: '🩺' },
              { id: 'pharmacy', label: language === 'hi' ? 'फार्मेसी' : 'Pharmacy', icon: '💊' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === tab.id
                    ? 'bg-white text-green-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mb-4"></div>
              <p className="text-gray-600 font-medium">
                {language === 'hi' ? 'आस-पास के स्थान खोज रहे हैं...' : 'Finding nearby places...'}
              </p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">{filteredPlaces.length}</div>
                  <div className="text-sm text-blue-800">{language === 'hi' ? 'स्थान मिले' : 'Places Found'}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600">{filteredPlaces.filter(p => p.isOpen).length}</div>
                  <div className="text-sm text-green-800">{language === 'hi' ? 'अभी खुले' : 'Open Now'}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600">{filteredPlaces.filter(p => p.cost === 'free').length}</div>
                  <div className="text-sm text-purple-800">{language === 'hi' ? 'मुफ्त सेवा' : 'Free Services'}</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {Math.min(...filteredPlaces.map(p => p.distance)).toFixed(1)}km
                  </div>
                  <div className="text-sm text-orange-800">{language === 'hi' ? 'निकटतम' : 'Nearest'}</div>
                </div>
              </div>

              {/* Places List */}
              <div className="space-y-4">
                {filteredPlaces.map((place) => (
                  <div key={place.id} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left Side */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-2xl">{getTypeIcon(place.type)}</span>
                              <h3 className="text-xl font-bold text-gray-900">
                                {language === 'hi' ? place.nameHi : place.name}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-medium">{place.rating}</span>
                                <span>({place.reviews})</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Navigation className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{place.distance}km</span>
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostBadge(place.cost).color}`}>
                                {getCostBadge(place.cost).text}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-2 flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{language === 'hi' ? place.addressHi : place.address}</span>
                        </p>

                        <div className="flex items-center space-x-4 mb-3">
                          <span className="flex items-center space-x-1 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className={place.isOpen ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                              {place.isOpen ? (language === 'hi' ? '🟢 खुला' : '🟢 Open') : (language === 'hi' ? '🔴 बंद' : '🔴 Closed')}
                            </span>
                            <span className="text-gray-600">• {place.openHours}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {(language === 'hi' ? place.servicesHi : place.services).slice(0, 3).map((service, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side - Actions */}
                      <div className="flex md:flex-col gap-2">
                        <button
                          onClick={() => openInMaps(place)}
                          className="flex-1 md:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>{language === 'hi' ? 'दिशा' : 'Directions'}</span>
                        </button>
                        <button
                          onClick={() => callPlace(place.phone)}
                          className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{language === 'hi' ? 'कॉल' : 'Call'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency */}
              <div className="mt-6 bg-red-50 border-2 border-red-200 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-red-900 mb-3">
                  🚨 {language === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => callPlace('108')}
                    className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                  >
                    📞 {language === 'hi' ? 'एम्बुलेंस: 108' : 'Ambulance: 108'}
                  </button>
                  <button
                    onClick={() => callPlace('102')}
                    className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                  >
                    📞 {language === 'hi' ? 'राष्ट्रीय स्वास्थ्य हेल्पलाइन: 1800-180-1104' : 'Health Helpline: 1800-180-1104'}
                  </button>
                  <button
                    onClick={() => callPlace('104')}
                    className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                  >
                    📞 {language === 'hi' ? 'राज्य स्वास्थ्य हेल्पलाइन: 104' : 'State Health: 104'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthcareFinder;