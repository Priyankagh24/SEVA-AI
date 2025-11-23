// -----------------------------------------------------------------------------
// File: src/App.tsx
// (updated to import/use the new VoiceVitalsHealth component)
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatInterface from './components/ChatInterface';
import LanguageSelector from './components/LanguageSelector';
import VoiceInput from './components/VoiceInput';
import OfflineIndicator from './components/OfflineIndicator';
import ImpactMetrics from './components/ImpactMetrics';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Stethoscope, Globe, Mic } from 'lucide-react';
import SymptomChecker from './components/SymptomChecker';
import MedicineScanner from './components/MedicineScanner';
import HealthcareFinder from './components/HealthcareFinder';
import HealthHistory from './components/HealthHistory';
import EmergencyMode from './components/EmergencyMode';
import VoiceEducation from './pages/VoiceEducation';
import Agriculture from './pages/Agriculture';
import Security from './pages/Security';

import Food from './pages/Food';
import Shopping from './pages/shopping';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import VideoLanding from './pages/VideoLanding';
import SimpleRegistration from './pages/SimpleRegistration';
import Dashboard from './pages/Dashboard';
import VoiceVitalsHealth from './pages/VoiceVitalsHealth';
import Transport from './pages/transportation';
import ReactDOM from "react-dom/client";
// i18n
import './i18n';
import { useTranslation } from 'react-i18next';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const queryClient = new QueryClient();
type AppStage = 'video' | 'registration' | 'main';

function App() {
  const { t, i18n } = useTranslation();
  const [stage, setStage] = useState<AppStage>('video');
  const [userData, setUserData] = useState<{ name: string; village: string } | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const isOnline = useOnlineStatus();
  const [showMedicineScanner, setShowMedicineScanner] = useState(false);
  const [showHealthcareFinder, setShowHealthcareFinder] = useState(false);
  const [showHealthHistory, setShowHealthHistory] = useState(false);
  const [showEmergencyMode, setShowEmergencyMode] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('voicevitals_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user?.name) {
          setUserData(user);
          // ✅ Don't skip directly to dashboard — first show registration/video flow
          // We’ll only go to "main" after they pass video and registration once.
        }
      } catch (e) {
        console.error('Invalid user data:', e);
      }
    }
  }, []);

  const handleVideoComplete = () => setStage('registration');
  const handleRegistrationComplete = (user: any) => {
    i18n.changeLanguage(user.language);
    setUserData(user);
    setStage('main');
  };

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === 'health') setSelectedService('health');
    else if (serviceId === "education") setSelectedService("education");
    else if (serviceId === "agriculture") setSelectedService("agriculture");
    else if (serviceId === "security") setSelectedService("security");
    else if (serviceId === "food") setSelectedService("food");
    else if (serviceId === "shopping") setSelectedService("shopping");
    else if (serviceId === "transport") setSelectedService("transport");
    else alert(t('comingSoon'));
  };

  const handleLogout = () => {
    localStorage.removeItem('voicevitals_user');
    setUserData(null);
    setStage('video');
    window.location.reload();
  };

  const resetRegistration = () => {
    localStorage.removeItem('voicevitals_user');
    setUserData(null);
    setStage('video');
    window.location.reload();
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if (stage === 'video') {
    return <VideoLanding onComplete={handleVideoComplete} language={i18n.language} />;
  }

  if (stage === 'registration') {
    return <SimpleRegistration onComplete={handleRegistrationComplete} language={i18n.language} />;
  }

  if (stage === 'main' && userData) {
    if (selectedService === 'health') {
      return (
        <QueryClientProvider client={queryClient}>
          <VoiceVitalsHealth
            language={i18n.language}
            setLanguage={(lang: string) => {
              i18n.changeLanguage(lang);
              localStorage.setItem('app_language', lang);
            }}
            onBack={() => setSelectedService(null)}
            userData={userData}
          />

          {/* Floating modals kept in App (if you want) */}
          {showSymptomChecker && (
            <SymptomChecker language={i18n.language} onClose={() => setShowSymptomChecker(false)} />
          )}
          {showMedicineScanner && (
            <MedicineScanner language={i18n.language} onClose={() => setShowMedicineScanner(false)} />
          )}
          {showHealthcareFinder && (
            <HealthcareFinder language={i18n.language} onClose={() => setShowHealthcareFinder(false)} />
          )}
          {showHealthHistory && <HealthHistory language={i18n.language} onClose={() => setShowHealthHistory(false)} />}
          {showEmergencyMode && <EmergencyMode language={i18n.language} onClose={() => setShowEmergencyMode(false)} />}
        </QueryClientProvider>
      );
    }

     if (selectedService === 'education') {
      return (
        <QueryClientProvider client={queryClient}>
          <VoiceEducation
            language={i18n.language}
            setLanguage={(lang: string) => {
              i18n.changeLanguage(lang);
              localStorage.setItem('app_language', lang);
            }}
            onBack={() => setSelectedService(null)}
            userData={userData}
          />
        </QueryClientProvider>
      );
    }
    
    if (selectedService === 'agriculture') {
  return (
    <QueryClientProvider client={queryClient}>
      <Agriculture
        language={i18n.language}
        setLanguage={(lang: string) => {
          i18n.changeLanguage(lang);
          localStorage.setItem('app_language', lang);
        }}
        onBack={() => setSelectedService(null)}
        userData={userData}
      />
    </QueryClientProvider>
  );
}


if (selectedService === 'security') {
  return (
    <QueryClientProvider client={queryClient}>
      <Security
        language={i18n.language}
        setLanguage={(lang: string) => {
          i18n.changeLanguage(lang);
          localStorage.setItem('app_language', lang);
        }}
        onBack={() => setSelectedService(null)}
        userData={userData}
      />
    </QueryClientProvider>
  );
}

if (selectedService === 'transport') {
  return (
    <QueryClientProvider client={queryClient}>
      <Transport
        language={i18n.language}
        setLanguage={(lang: string) => {
          i18n.changeLanguage(lang);
          localStorage.setItem('app_language', lang);
        }}
        onBack={() => setSelectedService(null)}
        userData={userData}
      />
    </QueryClientProvider>
  );
}

if (selectedService === 'food') {
  return (
    <QueryClientProvider client={queryClient}>
      <Food
        language={i18n.language}
        setLanguage={(lang: string) => {
          i18n.changeLanguage(lang);
          localStorage.setItem('app_language', lang);
        }}
        onBack={() => setSelectedService(null)}
        userData={userData}
      />
    </QueryClientProvider>
  );
}



if (selectedService === 'shopping') {
  return (
    <QueryClientProvider client={queryClient}>
      <Shopping
        language={i18n.language}
        setLanguage={(lang: string) => {
          i18n.changeLanguage(lang);
          localStorage.setItem('app_language', lang);
        }}
        onBack={() => setSelectedService(null)}
        userData={userData}
      />
    </QueryClientProvider>
  );
}


    return (
      
      <Dashboard
        userData={userData}
        language={i18n.language}
        onServiceSelect={handleServiceSelect}
        onLogout={handleLogout}
      />
    );
  }


  

  return null;
}

export default App;