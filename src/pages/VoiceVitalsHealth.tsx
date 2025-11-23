import React, { useState, useEffect, useRef } from 'react';
import {
  Stethoscope, Mic, MicOff, Send, Phone, MapPin, Clock, Star, ChevronRight, Activity, Heart, Thermometer,Pill,Calendar,FileText,AlertTriangle,Shield,Users,TrendingUp,Bell,Settings,Search,Plus,X,Navigation,MessageCircle,Bot,Sparkles,Zap,Award,Globe,Camera,Upload,Download,CheckCircle,XCircle,Info,Loader
} from 'lucide-react';

type Props = {
  language: string;
  setLanguage: (lang: string) => void;
  onBack: () => void;
  userData?: { name?: string } | null;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    greeting: 'Hello',
    dashboard: 'Health Dashboard',
    askAnything: 'Ask me anything about your health...',
    emergency: 'Emergency',
    symptoms: 'Symptom Checker',
    medicine: 'Medicine Scanner',
    findCare: 'Find Healthcare',
    history: 'Health History',
    vitals: 'My Vitals',
    appointments: 'Appointments',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    healthScore: 'Health Score',
    nearbyFacilities: 'Nearby Facilities',
    speaking: 'Listening...',
    send: 'Send',
    offline: 'Offline Mode',
    online: 'Connected',
    consultNow: 'Consult Now',
    viewAll: 'View All',
    bookAppointment: 'Book Appointment',
    callNow: 'Call Now',
    directions: 'Directions',
    aiPowered: 'AI-Powered Health Assistant',
    privacyFirst: 'Your data stays on your device',
    available247: 'Available 24/7',
    trustedBy: 'Trusted by 50,000+ users'
  },
  hi: {
    greeting: 'नमस्ते',
    dashboard: 'स्वास्थ्य डैशबोर्ड',
    askAnything: 'अपने स्वास्थ्य के बारे में कुछ भी पूछें...',
    emergency: 'आपातकाल',
    symptoms: 'लक्षण जांच',
    medicine: 'दवा स्कैनर',
    findCare: 'स्वास्थ्य सेवा खोजें',
    history: 'स्वास्थ्य इतिहास',
    vitals: 'मेरे वाइटल्स',
    appointments: 'अपॉइंटमेंट',
    quickActions: 'त्वरित कार्य',
    recentActivity: 'हाल की गतिविधि',
    healthScore: 'स्वास्थ्य स्कोर',
    nearbyFacilities: 'नज़दीकी सुविधाएं',
    speaking: 'सुन रहा हूं...',
    send: 'भेजें',
    offline: 'ऑफ़लाइन मोड',
    online: 'कनेक्टेड',
    consultNow: 'अभी परामर्श करें',
    viewAll: 'सभी देखें',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    callNow: 'अभी कॉल करें',
    directions: 'दिशा-निर्देश',
    aiPowered: 'AI-संचालित स्वास्थ्य सहायक',
    privacyFirst: 'आपका डेटा आपके डिवाइस पर रहता है',
    available247: '24/7 उपलब्ध',
    trustedBy: '50,000+ उपयोगकर्ताओं द्वारा विश्वसनीय'
  }
};



export default function VoiceVitalsHealth({ language, setLanguage, onBack, userData }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ type: string; text: string; time: string }>>([
    { type: 'bot', text: "Hello! I'm your AI health assistant. How can I help you today?", time: '10:30 AM' }
  ]);


  const containerRef = useRef<HTMLDivElement>(null);
  
useEffect(() => {
  containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
}, []);

  const [healthScore] = useState<number>(78);
  const [isProcessing, setIsProcessing] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [severity, setSeverity] = useState<number>(5);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [medicineImage, setMedicineImage] = useState<string>('');
  const [medicineInfo, setMedicineInfo] = useState<any>(null);
  const [healthHistory, setHealthHistory] = useState<any[]>([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [nearbyResults, setNearbyResults] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language] || translations.en;

  const vitalsData = [
    { icon: Heart, label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', color: 'rose' },
    { icon: Activity, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', color: 'blue' },
    { icon: Thermometer, label: 'Temperature', value: '98.6', unit: '°F', status: 'normal', color: 'amber' },
    { icon: Zap, label: 'Glucose', value: '95', unit: 'mg/dL', status: 'normal', color: 'emerald' }
  ];

  const quickActions = [
    { icon: Stethoscope, label: t.symptoms, color: 'bg-blue-500', onClick: () => setActiveModal('symptoms') },
    { icon: Pill, label: t.medicine, color: 'bg-pink-500', onClick: () => setActiveModal('medicine') },
    { icon: MapPin, label: t.findCare, color: 'bg-emerald-500', onClick: () => setActiveModal('findcare') },
    { icon: FileText, label: t.history, color: 'bg-purple-500', onClick: () => setActiveModal('history') }
  ];

  const nearbyFacilities = [
    { name: 'City Health Clinic', type: 'Primary Care', distance: '0.8 km', rating: 4.8, open: true, wait: '15 min' },
    { name: 'Apollo Pharmacy', type: 'Pharmacy', distance: '0.3 km', rating: 4.5, open: true, wait: 'No wait' },
    { name: 'District Hospital', type: 'Hospital', distance: '2.1 km', rating: 4.2, open: true, wait: '45 min' }
  ];

  const recentActivity = [
    { icon: MessageCircle, text: 'Consulted about headache symptoms', time: '2 hours ago', color: 'blue' },
    { icon: Pill, text: 'Scanned Paracetamol 500mg', time: 'Yesterday', color: 'pink' },
    { icon: Calendar, text: 'Booked appointment with Dr. Sharma', time: '2 days ago', color: 'emerald' }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages(prev => [...prev, { type: 'user', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    const userMessage = message;
    setMessage('');
    setIsProcessing(true);
    
    setTimeout(() => {
      const response = generateAIResponse(userMessage);
      setChatMessages(prev => [...prev, {
        type: 'bot',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsProcessing(false);
      
      const historyEntry = {
        id: Date.now(),
        type: 'consultation',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        query: userMessage,
        response: response
      };
      setHealthHistory(prev => [historyEntry, ...prev]);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('fever') || lowerQuery.includes('temperature')) {
      return "A fever typically indicates your body is fighting an infection. I recommend: 1) Monitor your temperature every 4 hours, 2) Stay hydrated (8-10 glasses of water), 3) Rest adequately, 4) Take acetaminophen if temperature exceeds 101°F. If fever persists beyond 3 days or exceeds 103°F, please consult a doctor immediately.";
    } else if (lowerQuery.includes('headache') || lowerQuery.includes('head pain')) {
      return "For headaches, try these steps: 1) Rest in a quiet, dark room, 2) Apply a cold compress to your forehead, 3) Stay hydrated, 4) Avoid screens for 30 minutes. If accompanied by vision changes, neck stiffness, or severe pain, seek immediate medical attention.";
    } else if (lowerQuery.includes('cough') || lowerQuery.includes('cold')) {
      return "For cold and cough: 1) Drink warm fluids (honey lemon tea works well), 2) Use a humidifier, 3) Gargle with salt water 3x daily, 4) Get adequate rest. If cough persists beyond 2 weeks or you have difficulty breathing, please consult a healthcare provider.";
    } else if (lowerQuery.includes('stomach') || lowerQuery.includes('digestive')) {
      return "For digestive issues: 1) Eat bland foods (rice, bananas, toast), 2) Avoid spicy and fatty foods, 3) Stay hydrated with electrolyte solutions, 4) Try ginger tea. If symptoms include severe pain, blood in stool, or persist beyond 48 hours, seek medical care.";
    } else if (lowerQuery.includes('sleep') || lowerQuery.includes('insomnia')) {
      return "To improve sleep: 1) Maintain a consistent sleep schedule, 2) Avoid screens 1 hour before bed, 3) Keep your room cool and dark, 4) Try relaxation techniques like deep breathing. If insomnia persists, consider consulting a sleep specialist.";
    } else if (lowerQuery.includes('stress') || lowerQuery.includes('anxiety')) {
      return "For stress management: 1) Practice deep breathing exercises, 2) Regular physical activity (30 min daily), 3) Maintain a healthy sleep routine, 4) Consider meditation or yoga. If anxiety is severe or persistent, please consult a mental health professional.";
    } else {
      return "I understand your concern. Based on your query, I recommend: 1) Monitor your symptoms closely, 2) Stay hydrated and well-rested, 3) Maintain a healthy diet. If symptoms worsen or persist, please consult a healthcare provider. Would you like me to help you find nearby clinics or provide more specific guidance?";
    }
  };

  const analyzeSymptoms = () => {
    if (symptoms.length === 0) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const result = {
        possibleConditions: [
          { name: 'Common Cold', probability: 75, severity: 'Mild', recommendation: 'Rest and hydration' },
          { name: 'Viral Infection', probability: 60, severity: 'Mild to Moderate', recommendation: 'Monitor symptoms, consult if worsens' },
          { name: 'Allergic Reaction', probability: 40, severity: 'Mild', recommendation: 'Identify and avoid allergen' }
        ],
        recommendations: [
          'Get adequate rest (7-8 hours)',
          'Stay hydrated (8-10 glasses of water daily)',
          'Monitor temperature regularly',
          'Avoid contact with others to prevent spread'
        ],
        urgency: severity > 7 ? 'High - Consult doctor within 24 hours' : severity > 4 ? 'Moderate - Monitor closely' : 'Low - Self-care recommended',
        additionalNotes: 'These are AI-generated suggestions based on common patterns. Always consult a healthcare professional for accurate diagnosis.'
      };
      setDiagnosisResult(result);
      setIsProcessing(false);
      
      setHealthHistory(prev => [{
        id: Date.now(),
        type: 'symptom_check',
        date: new Date().toLocaleDateString(),
        symptoms: symptoms,
        bodyPart: selectedBodyPart,
        duration: duration,
        severity: severity,
        result: result
      }, ...prev]);
    }, 2000);
  };

  const analyzeMedicine = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const mockMedicines = [
        {
          name: 'Paracetamol 500mg',
          genericName: 'Acetaminophen',
          uses: 'Pain relief, fever reduction',
          dosage: '1-2 tablets every 4-6 hours, max 8 tablets/day',
          sideEffects: 'Rare: nausea, skin rash, liver damage (overdose)',
          precautions: 'Avoid alcohol, do not exceed recommended dose',
          price: '₹20-40 for 10 tablets',
          prescription: 'Not required'
        },
        {
          name: 'Ibuprofen 400mg',
          genericName: 'Ibuprofen',
          uses: 'Pain relief, anti-inflammatory, fever reduction',
          dosage: '1 tablet every 6-8 hours with food',
          sideEffects: 'Stomach upset, heartburn, dizziness',
          precautions: 'Take with food, avoid if stomach ulcers',
          price: '₹30-60 for 10 tablets',
          prescription: 'Not required'
        },
        {
          name: 'Amoxicillin 500mg',
          genericName: 'Amoxicillin',
          uses: 'Bacterial infections',
          dosage: '1 tablet 3 times daily for 5-7 days',
          sideEffects: 'Diarrhea, nausea, allergic reactions',
          precautions: 'Complete full course, inform doctor of allergies',
          price: '₹80-150 for 10 tablets',
          prescription: 'Required'
        }
      ];
      
      const randomMedicine = mockMedicines[Math.floor(Math.random() * mockMedicines.length)];
      setMedicineInfo(randomMedicine);
      setIsProcessing(false);
      
      setHealthHistory(prev => [{
        id: Date.now(),
        type: 'medicine_scan',
        date: new Date().toLocaleDateString(),
        medicine: randomMedicine.name,
        info: randomMedicine
      }, ...prev]);
    }, 1500);
  };

  const searchHealthcare = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const mockFacilities = [
        {
          name: 'Apollo Hospital',
          type: 'Multi-Specialty Hospital',
          specialty: searchSpecialty || 'General',
          distance: '1.2 km',
          rating: 4.7,
          reviews: 1250,
          open: true,
          wait: '30 min',
          phone: '+91-9876543210',
          address: 'Sector 15, Main Road',
          services: ['Emergency', 'OPD', 'Lab Tests', 'Pharmacy'],
          doctors: 45,
          beds: 200
        },
        {
          name: 'City Health Clinic',
          type: 'Primary Care Clinic',
          specialty: searchSpecialty || 'General',
          distance: '0.5 km',
          rating: 4.5,
          reviews: 890,
          open: true,
          wait: '15 min',
          phone: '+91-9876543211',
          address: 'MG Road, Near Park',
          services: ['OPD', 'Lab Tests', 'Vaccination'],
          doctors: 8,
          beds: 0
        },
        {
          name: 'MedPlus Pharmacy',
          type: 'Pharmacy',
          specialty: 'Medicines',
          distance: '0.3 km',
          rating: 4.3,
          reviews: 560,
          open: true,
          wait: 'No wait',
          phone: '+91-9876543212',
          address: 'Market Complex, Shop 12',
          services: ['Prescription Medicines', 'OTC', 'Home Delivery'],
          doctors: 0,
          beds: 0
        },
        {
          name: 'District Government Hospital',
          type: 'Government Hospital',
          specialty: searchSpecialty || 'General',
          distance: '2.8 km',
          rating: 4.1,
          reviews: 2100,
          open: true,
          wait: '60 min',
          phone: '108',
          address: 'Civil Lines, Government Complex',
          services: ['Emergency', 'OPD', 'Surgery', 'Free Treatment'],
          doctors: 120,
          beds: 500
        }
      ];
      
      setNearbyResults(mockFacilities);
      setIsProcessing(false);
    }, 1000);
  };

 useEffect(() => {
  window.scrollTo(0, 0);
  const loadHistory = async () => {
    try {
      const stored = await window.storage?.get('health_history');
      if (stored && stored.value) {
        setHealthHistory(JSON.parse(stored.value));
      }
    } catch (err) {
      console.log('No stored history');
    }
  };
  loadHistory();
}, []);


  useEffect(() => {
    if (healthHistory.length > 0) {
      window.storage?.set('health_history', JSON.stringify(healthHistory)).catch(() => {});
    }
  }, [healthHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="bg-white/20 p-2 rounded-xl backdrop-blur">
                <Stethoscope className="w-7 h-7" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">VoiceVitals AI</h1>
                <p className="text-xs text-emerald-100">{t.aiPowered}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* ONLINE STATUS */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isOnline
                    ? "bg-emerald-400/30 text-white"
                    : "bg-red-400/30 text-red-100"
                }`}
              >
                <span
                  className={`${
                    isOnline
                      ? "w-2 h-2 rounded-full bg-emerald-300 animate-pulse"
                      : "w-2 h-2 rounded-full bg-red-400"
                  }`}
                />
                {isOnline ? t.online : t.offline}
              </div>

              {/* LANGUAGE */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/20 border-0 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur hover:bg-white/30 transition cursor-pointer"
              >
                <option value="en" className="text-gray-900">English</option>
                <option value="hi" className="text-gray-900">हिन्दी</option>
              </select>

              <button className="p-2 hover:bg-white/20 rounded-lg transition">
                <Bell className="w-5 h-5" />
              </button>

              <button className="p-2 hover:bg-white/20 rounded-lg transition">
                <Settings className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* EMERGENCY BAR */}
      <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">For medical emergencies, call 108 immediately</span>
          </div>
          <button className="flex items-center gap-2 bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-red-50 transition">
            <Phone className="w-4 h-4" />
            {t.emergency}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Shield, label: t.privacyFirst, color: "emerald" },
            { icon: Clock, label: t.available247, color: "blue" },
            { icon: Users, label: t.trustedBy, color: "purple" },
            { icon: Award, label: "HIPAA Compliant", color: "amber" }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE PANELS */}
          <div className="space-y-6">

            {/* HEALTH SCORE */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{t.healthScore}</h3>
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth={8} fill="none" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="white"
                      strokeWidth={8}
                      fill="none"
                      strokeDasharray={`${healthScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{healthScore}</span>
                  </div>
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Your health is</p>
                  <p className="text-xl font-bold">Good</p>
                  <p className="text-emerald-100 text-xs mt-1">+5 from last week</p>
                </div>
              </div>
            </div>

            {/* VITALS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{t.vitals}</h3>
                <button className="text-emerald-600 text-sm font-medium hover:underline">
                  {t.viewAll}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {vitalsData.map((v, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl bg-${v.color}-50 border border-${v.color}-100`}
                  >
                    <v.icon className={`w-5 h-5 text-${v.color}-500 mb-2`} />
                    <p className="text-xs text-gray-500">{v.label}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {v.value} <span className="text-xs text-gray-500">{v.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                {t.quickActions}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className={`${action.color} text-white p-4 rounded-xl flex flex-col items-center gap-2 hover:opacity-90 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CHAT PANEL */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
            
            {/* CHAT HEADER */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2 rounded-xl">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {t.aiPowered}
                </p>
              </div>
            </div>

            {/* CHAT MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-emerald-500 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.type === "user" ? "text-emerald-100" : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin text-emerald-500" />
                      <span className="text-sm text-gray-600">Analyzing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* CHAT INPUT */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`p-3 rounded-xl transition ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={isListening ? t.speaking : t.askAnything}
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  onClick={sendMessage}
                  className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* VOICE ANIMATION */}
              {isListening && (
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-emerald-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{t.speaking}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE PANELS */}
          <div className="space-y-6">

            {/* NEARBY FACILITIES */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{t.nearbyFacilities}</h3>
                <button className="text-emerald-600 text-sm font-medium hover:underline">
                  {t.viewAll}
                </button>
              </div>

              <div className="space-y-3">
                {nearbyFacilities.map((f, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{f.name}</h4>
                        <p className="text-xs text-gray-500">{f.type}</p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          f.open
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {f.open ? "Open" : "Closed"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {f.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400" /> {f.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {f.wait}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" /> {t.callNow}
                      </button>
                      <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition flex items-center justify-center gap-1">
                        <Navigation className="w-3 h-3" /> {t.directions}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                {t.recentActivity}
              </h3>

              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className={`p-2 rounded-lg bg-${a.color}-100`}>
                      <a.icon className={`w-4 h-4 text-${a.color}-500`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{a.text}</p>
                      <p className="text-xs text-gray-400">{a.time}</p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Your health data is encrypted and never leaves your device</span>
            </div>
            <p className="text-xs text-gray-400">⚠ This is not a substitute for professional medical advice. Always consult a healthcare provider.</p>
          </div>
        </div>
      </footer>

      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            
            {activeModal === 'symptoms' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{t.symptoms}</h3>
                    <p className="text-sm text-gray-500 mt-1">Tell us what you're experiencing</p>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!diagnosisResult ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Affected Body Part</label>
                      <select value={selectedBodyPart} onChange={(e) => setSelectedBodyPart(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                        <option value="">Select body part</option>
                        <option value="head">Head</option>
                        <option value="chest">Chest</option>
                        <option value="abdomen">Abdomen</option>
                        <option value="throat">Throat</option>
                        <option value="back">Back</option>
                        <option value="joints">Joints</option>
                        <option value="skin">Skin</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Symptoms</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['Fever', 'Cough', 'Headache', 'Nausea', 'Fatigue', 'Body Ache', 'Sore Throat', 'Runny Nose', 'Dizziness', 'Shortness of Breath', 'Chest Pain', 'Loss of Appetite'].map((symptom) => (
                          <button
                            key={symptom}
                            onClick={() => {
                              if (symptoms.includes(symptom)) {
                                setSymptoms(symptoms.filter(s => s !== symptom));
                              } else {
                                setSymptoms([...symptoms, symptom]);
                              }
                            }}
                            className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                              symptoms.includes(symptom)
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            {symptom}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">How long have you had these symptoms?</label>
                      <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                        <option value="">Select duration</option>
                        <option value="less-24h">Less than 24 hours</option>
                        <option value="1-3days">1-3 days</option>
                        <option value="4-7days">4-7 days</option>
                        <option value="1-2weeks">1-2 weeks</option>
                        <option value="more-2weeks">More than 2 weeks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pain/Discomfort Level: {severity}/10</label>
                      <input type="range" min="1" max="10" value={severity} onChange={(e) => setSeverity(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                      </div>
                    </div>

                    <button
                      onClick={analyzeSymptoms}
                      disabled={symptoms.length === 0 || !selectedBodyPart || !duration || isProcessing}
                      className="w-full py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Analyze Symptoms
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h4 className="text-lg font-bold text-gray-900">Analysis Complete</h4>
                      </div>
                      <p className="text-sm text-gray-600">Based on your symptoms, here's what we found:</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Possible Conditions</h4>
                      <div className="space-y-3">
                        {diagnosisResult.possibleConditions.map((condition: any, i: number) => (
                          <div key={i} className="p-4 bg-white border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900">{condition.name}</h5>
                              <span className="text-sm font-semibold text-emerald-600">{condition.probability}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${condition.probability}%` }} />
                            </div>
                            <p className="text-xs text-gray-600">Severity: <span className="font-medium">{condition.severity}</span></p>
                            <p className="text-xs text-gray-600 mt-1">Recommendation: {condition.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                   <div>
  <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
  <ul className="space-y-2">
    {diagnosisResult.recommendations.map((rec: string, i: number) => (
      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
        {rec}
      </li>
    ))}
  </ul>
</div>

                  <div
  className={
    `p-4 rounded-xl border-2 ` +
    (diagnosisResult.urgency.includes('High')
      ? 'bg-red-50 border-red-200'
      : diagnosisResult.urgency.includes('Moderate')
      ? 'bg-amber-50 border-amber-200'
      : 'bg-blue-50 border-blue-200')
  }
>
  <p className="font-semibold text-gray-900 mb-1">Urgency Level</p>
  <p className="text-sm text-gray-700">{diagnosisResult.urgency}</p>
</div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {diagnosisResult.additionalNotes}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setDiagnosisResult(null);
                          setSymptoms([]);
                          setSelectedBodyPart('');
                          setDuration('');
                          setSeverity(5);
                        }}
                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                      >
                        New Check
                      </button>
                      <button
                        onClick={() => {
                          setActiveModal('findcare');
                          setDiagnosisResult(null);
                        }}
                        className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition"
                      >
                        Find Healthcare
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeModal === 'medicine' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{t.medicine}</h3>
                    <p className="text-sm text-gray-500 mt-1">Scan or search for medicine information</p>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!medicineInfo ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-2">Scan Medicine</h4>
                      <p className="text-sm text-gray-600 mb-4">Take a photo of the medicine label or upload an image</p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={analyzeMedicine} className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center gap-2">
                          <Camera className="w-5 h-5" />
                          Take Photo (Demo)
                        </button>
                        <button onClick={analyzeMedicine} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition flex items-center gap-2">
                          <Upload className="w-5 h-5" />
                          Upload Image (Demo)
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Search Medicine Name</label>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Enter medicine name..." className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                        <button onClick={analyzeMedicine} disabled={isProcessing} className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition disabled:bg-gray-300 flex items-center gap-2">
                          {isProcessing ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-200">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{medicineInfo.name}</h4>
                      <p className="text-sm text-gray-600">Generic: {medicineInfo.genericName}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          medicineInfo.prescription === 'Required' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {medicineInfo.prescription === 'Required' ? '⚠ Prescription Required' : '✓ No Prescription Needed'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {medicineInfo.price}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Pill className="w-4 h-4 text-emerald-500" />
                          Uses
                        </h5>
                        <p className="text-sm text-gray-700">{medicineInfo.uses}</p>
                      </div>

                      <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-500" />
                          Dosage
                        </h5>
                        <p className="text-sm text-gray-700">{medicineInfo.dosage}</p>
                      </div>

                      <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Side Effects
                        </h5>
                        <p className="text-sm text-gray-700">{medicineInfo.sideEffects}</p>
                      </div>

                      <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-500" />
                          Precautions
                        </h5>
                        <p className="text-sm text-gray-700">{medicineInfo.precautions}</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                      <p className="text-xs text-gray-600 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                        Always consult a healthcare professional before starting any medication. This information is for educational purposes only.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setMedicineInfo(null)} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition">
                        Scan Another
                      </button>
                      <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Save to History
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeModal === 'findcare' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{t.findCare}</h3>
                    <p className="text-sm text-gray-500 mt-1">Find nearby healthcare facilities</p>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="Enter location or use current" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                      <select value={searchSpecialty} onChange={(e) => setSearchSpecialty(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                        <option value="">All Specialties</option>
                        <option value="General">General Physician</option>
                        <option value="Pediatric">Pediatrician</option>
                        <option value="Cardiology">Cardiologist</option>
                        <option value="Dermatology">Dermatologist</option>
                        <option value="Orthopedic">Orthopedic</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Lab">Lab/Diagnostics</option>
                      </select>
                    </div>
                  </div>

                  <button onClick={searchHealthcare} disabled={isProcessing} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition disabled:bg-gray-300 flex items-center justify-center gap-2">
                    {isProcessing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Search Nearby
                      </>
                    )}
                  </button>

                  {nearbyResults.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Found {nearbyResults.length} facilities nearby</h4>
                      {nearbyResults.map((facility, i) => (
                        <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="font-semibold text-gray-900 text-lg">{facility.name}</h5>
                              <p className="text-sm text-gray-600">{facility.type}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              facility.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {facility.open ? '● Open Now' : '● Closed'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-emerald-500" />
                              {facility.distance}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              {facility.rating} ({facility.reviews})
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4 text-blue-500" />
                              {facility.wait}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-4 h-4 text-purple-500" />
                              {facility.doctors} doctors
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{facility.address}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {facility.services.map((service: string, j: number) => (
                              <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                                {service}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" />
                              Call: {facility.phone}
                            </button>
                            <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2">
                              <Navigation className="w-4 h-4" />
                              Get Directions
                            </button>
                            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition flex items-center justify-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeModal === 'history' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{t.history}</h3>
                    <p className="text-sm text-gray-500 mt-1">Your complete health history</p>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {healthHistory.length === 0 ? (
                  <div className="py-12 text-center">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No health history yet</p>
                    <p className="text-sm text-gray-400 mt-2">Your consultations and scans will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {healthHistory.map((entry) => (
                      <div key={entry.id} className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {entry.type === 'consultation' && (
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                              </div>
                            )}
                            {entry.type === 'symptom_check' && (
                              <div className="p-2 bg-emerald-100 rounded-lg">
                                <Stethoscope className="w-5 h-5 text-emerald-600" />
                              </div>
                            )}
                            {entry.type === 'medicine_scan' && (
                              <div className="p-2 bg-pink-100 rounded-lg">
                                <Pill className="w-5 h-5 text-pink-600" />
                              </div>
                            )}
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                {entry.type === 'consultation' && 'AI Consultation'}
                                {entry.type === 'symptom_check' && 'Symptom Check'}
                                {entry.type === 'medicine_scan' && 'Medicine Scan'}
                              </h5>
                              <p className="text-xs text-gray-500">{entry.date} • {entry.time}</p>
                            </div>
                          </div>
                        </div>

                        {entry.type === 'consultation' && (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700"><strong>Query:</strong> {entry.query}</p>
                            <p className="text-sm text-gray-600">{entry.response}</p>
                          </div>
                        )}

                        {entry.type === 'symptom_check' && (
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {entry.symptoms.map((s: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs">
                                  {s}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">Body Part: <strong>{entry.bodyPart}</strong> • Duration: <strong>{entry.duration}</strong> • Severity: <strong>{entry.severity}/10</strong></p>
                          </div>
                        )}

                        {entry.type === 'medicine_scan' && (
                          <div>
                            <p className="text-sm text-gray-700"><strong>Medicine:</strong> {entry.medicine}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {healthHistory.length > 0 && (
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Export History
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to clear all health history?')) {
                          setHealthHistory([]);
                          window.storage?.delete('health_history').catch(() => {});
                        }
                      }}
                      className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Clear History
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}