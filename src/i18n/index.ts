import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ✅ Hindi translations (default)
const hiTranslations = {
  hello: "नमस्ते",
  friend: "मित्र",
  backToDashboard: "डैशबोर्ड पर वापस जाएं",
  impactMetrics: "प्रभाव मीट्रिक्स",
  symptomChecker: "लक्षण जाँचें",
  medicineScanner: "दवा स्कैनर",
  findHealthcare: "स्वास्थ्य सेवा खोजें",
  history: "इतिहास",
  language: "भाषा चुनें",
  voiceInput: "आवाज़ इनपुट",
  howItWorks: "यह कैसे काम करता है",
  speakOrType: "बोलें या टाइप करें",
  worksOffline: "ऑफलाइन भी काम करता है",
  instantGuidance: "तुरंत मार्गदर्शन",
  findNearbyClinics: "पास के क्लिनिक खोजें",
  disclaimer: "यह ऐप केवल सामान्य स्वास्थ्य सहायता के लिए है।",
  status: "स्थिति",
  emergencyHelp: "आपातकालीन सहायता",
  comingSoon: "जल्द आ रहा है!",
};

// ✅ English translations
const enTranslations = {
  hello: "Hello",
  friend: "Friend",
  backToDashboard: "Back to Dashboard",
  impactMetrics: "Impact Metrics",
  symptomChecker: "Symptom Checker",
  medicineScanner: "Medicine Scanner",
  findHealthcare: "Find Healthcare",
  history: "History",
  language: "Choose Language",
  voiceInput: "Voice Input",
  howItWorks: "How It Works",
  speakOrType: "Speak or type",
  worksOffline: "Works offline",
  instantGuidance: "Instant guidance",
  findNearbyClinics: "Find nearby clinics",
  disclaimer: "This app is for general health assistance only.",
  status: "Status",
  emergencyHelp: "Emergency Help",
  comingSoon: "Coming soon!",
};

// ✅ Initialize i18n
i18n.use(initReactI18next).init({
  fallbackLng: "hi",
  lng: localStorage.getItem("app_language") || "hi",
  resources: {
    hi: { translation: hiTranslations },
    en: { translation: enTranslations },
  },
  interpolation: { escapeValue: false },
});

export default i18n;

