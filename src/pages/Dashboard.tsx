import React, { useState,useEffect } from 'react';
import { 
  Heart, GraduationCap, Cloud, ShoppingBag, Shirt, Shield,LogOut,MapPin,ChevronRight,Globe,Bell,Search,Settings,User,TrendingUp,Award,Clock,Star,Bookmark,Plus,Filter,Grid,List,HelpCircle,Phone,Users,Book
} from 'lucide-react';

interface DashboardProps {
  userData: { name: string; village: string };
  language: string;
  onServiceSelect: (service: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, language: initialLanguage, onServiceSelect, onLogout }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const filters = [
    { id: 'all', label: { en: 'All Services', hi: 'सभी सेवाएं', ur: 'تمام خدمات', te: 'అన్ని సేవలు', mr: 'सर्व सेवा', pa: 'ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ' }, icon: Grid },
    { id: 'essential', label: { en: 'Essential', hi: 'आवश्यक', ur: 'ضروری', te: 'అవసరమైన', mr: 'आवश्यक', pa: 'ਜ਼ਰੂਰੀ' }, icon: Star },
    { id: 'popular', label: { en: 'Popular', hi: 'लोकप्रिय', ur: 'مقبول', te: 'జనాదరణ పొందిన', mr: 'लोकप्रिय', pa: 'ਪ੍ਰਸਿੱਧ' }, icon: TrendingUp },
    { id: 'recent', label: { en: 'Recent', hi: 'हाल का', ur: 'حالیہ', te: 'ఇటీవలి', mr: 'अलीकडील', pa: 'ਤਾਜ਼ਾ' }, icon: Clock }
  ];

  const notifications = [
    { id: 1, message: { en: 'New health advisory available', hi: 'नई स्वास्थ्य सलाह उपलब्ध' }, time: '5m ago', unread: true },
    { id: 2, message: { en: 'Education services launching soon', hi: 'शिक्षा सेवाएं जल्द शुरू' }, time: '1h ago', unread: true },
    { id: 3, message: { en: 'Weather alert for your area', hi: 'आपके क्षेत्र के लिए मौसम चेतावनी' }, time: '3h ago', unread: false }
  ];

  const services = [
    {
      id: 'health',
      icon: Heart,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'essential',
      popularity: 95,
      users: '10,247',
      rating: 4.8,
      title: {
        hi: 'स्वास्थ्य सेवाएं',
        en: 'Health Services',
        ur: 'صحت کی خدمات',
        te: 'ఆరోగ్య సేవలు',
        mr: 'आरोग्य सेवा',
        pa: 'ਸਿਹਤ ਸੇਵਾਵਾਂ'
      },
      description: {
        hi: 'AI डॉक्टर परामर्श, दवा स्कैनर, आपातकालीन सहायता',
        en: 'AI doctor consultation, medicine scanner, emergency support',
        ur: 'AI ڈاکٹر مشاورت، دوا اسکینر، ہنگامی مدد',
        te: 'AI వైద్య సలహా, ఔషధ స్కానర్, అత్యవసర మద్దతు',
        mr: 'AI डॉक्टर सल्ला, औषध स्कॅनर, आपत्कालीन मदत',
        pa: 'AI ਡਾਕਟਰ ਸਲਾਹ, ਦਵਾਈ ਸਕੈਨਰ, ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ'
      },
      features: ['AI Doctor', 'Medicine Scanner', 'Emergency SOS', 'Health History'],
      available: true,
      badge: { en: 'Most Popular', hi: 'सबसे लोकप्रिय' },
      badgeColor: 'bg-blue-600'
    },
    {
      id: 'education',
      icon: GraduationCap,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      hoverBorder: 'hover:border-indigo-500',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      category: 'essential',
      popularity: 78,
      users: 'Coming Soon',
      rating: 0,
      title: {
        hi: 'शिक्षा सेवाएं',
        en: 'Education Services',
        ur: 'تعلیمی خدمات',
        te: 'విద్యా సేవలు',
        mr: 'शिक्षण सेवा',
        pa: 'ਸਿੱਖਿਆ ਸੇਵਾਵਾਂ'
      },
      description: {
        hi: 'स्कूल खोजें, छात्रवृत्ति, करियर मार्गदर्शन',
        en: 'School search, scholarships, career guidance',
        ur: 'اسکول تلاش، وظائف، کیریئر رہنمائی',
        te: 'పాఠశాల శోధన, స్కాలర్‌షిప్‌లు, కెరీర్ మార్గదర్శకత్వం',
        mr: 'शाळा शोध, शिष्यवृत्ती, करिअर मार्गदर्शन',
        pa: 'ਸਕੂਲ ਖੋਜ, ਸਕਾਲਰਸ਼ਿਪ, ਕੈਰੀਅਰ ਮਾਰਗਦਰਸ਼ਨ'
      },
      features: ['School Finder', 'Scholarships', 'Online Classes', 'Career Guide'],
      available: true,
      badge: { en: 'Priority', hi: 'जल्द आ रहा है' },
      badgeColor: 'bg-indigo-600'
    },
    {
      id: 'agriculture',
      icon: Cloud,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'agriculture',
      popularity: 82,
      users: 'Coming Soon',
      rating: 0,
      title: {
        hi: 'कृषि और मौसम',
        en: 'Agriculture & Weather',
        ur: 'زراعت اور موسم',
        te: 'వ్యవసాయం & వాతావరణం',
        mr: 'शेती आणि हवामान',
        pa: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਮੌਸਮ'
      },
      description: {
        hi: 'मौसम पूर्वानुमान, फसल सलाह, बाजार भाव, कीट पहचान',
        en: 'Weather forecast, crop advice, market prices, pest identification',
        ur: 'موسم کی پیشن گوئی، فصل مشورہ، بازار قیمتیں',
        te: 'వాతావరణ అంచనా, పంట సలహా, మార్కెట్ ధరలు',
        mr: 'हवामान अंदाज, पीक सल्ला, बाजार भाव',
        pa: 'ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ, ਫਸਲ ਸਲਾਹ'
      },
      features: ['Weather Alert', 'Crop Advice', 'Market Prices', 'Pest ID'],
      available: true,
      badge: { en: 'Trending', hi: 'ट्रेंडिंग' },
      badgeColor: 'bg-green-600'
    },
    {
      id: 'security',
      icon: Shield,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'essential',
      popularity: 88,
      users: 'Coming Soon',
      rating: 0,
      title: {
        hi: 'सुरक्षा सेवाएं',
        en: 'Safety Services',
        ur: 'حفاظتی خدمات',
        te: 'భద్రతా సేవలు',
        mr: 'सुरक्षा सेवा',
        pa: 'ਸੁਰੱਖਿਆ ਸੇਵਾਵਾਂ'
      },
      description: {
        hi: 'SOS अलर्ट, पुलिस हेल्पलाइन, महिला सुरक्षा, कानूनी मदद',
        en: 'SOS alerts, police helpline, women safety, legal aid',
        ur: 'SOS الرٹ، پولیس ہیلپ لائن، خواتین کی حفاظت',
        te: 'SOS హెచ్చరికలు, పోలీసు హెల్ప్‌లైన్, మహిళా భద్రత',
        mr: 'SOS अलर्ट, पोलीस हेल्पलाइन, महिला सुरक्षा',
        pa: 'SOS ਅਲਰਟ, ਪੁਲਿਸ ਹੈਲਪਲਾਈਨ, ਔਰਤਾਂ ਦੀ ਸੁਰੱਖਿਆ'
      },
      features: ['SOS Alert', 'Police Helpline', 'Women Safety', 'Legal Aid'],
      available: true,
      badge: { en: 'Priority', hi: 'प्राथमिकता' },
      badgeColor: 'bg-purple-600'
    },
    {
  id: 'transport',
  icon: MapPin,
  color: 'yellow',
  gradient: 'from-yellow-500 to-orange-500',
  bgColor: 'bg-yellow-50',
  borderColor: 'border-yellow-200',
  hoverBorder: 'hover:border-yellow-500',
  iconBg: 'bg-yellow-100',
  iconColor: 'text-yellow-600',
  category: 'essential',
  popularity: 75,
  users: 'New',
  rating: 0,
  title: {
    hi: 'परिवहन सेवाएं',
    en: 'Transportation Services',
    ur: 'ٹرانسپورٹ کی خدمات',
    te: 'రవాణా సేవలు',
    mr: 'परिवहन सेवा',
    pa: 'ਆਵਾਜਾਈ ਸੇਵਾਵਾਂ'
  },
  description: {
    hi: 'बसें, टैक्सी, शेड्यूल, और किराया जानकारी',
    en: 'Buses, taxis, schedules, and fare info',
    ur: 'بسیں، ٹیکسیاں، شیڈول اور کرایہ معلومات',
    te: 'బస్సులు, టాక్సీలు, షెడ్యూల్, మరియు ఫేర్ సమాచారం',
    mr: 'बस, टॅक्सी, वेळापत्रक आणि भाडे माहिती',
    pa: 'ਬੱਸਾਂ, ਟੈਕਸੀ, ਸਮਾਂਸੂਚੀ ਅਤੇ ਕਿਰਾਇਆ ਜਾਣਕਾਰੀ'
  },
  features: ['Bus', 'Taxi', 'Ride Scheduling', 'Fare Info'],
  available: true,
  badge: { en: 'New', hi: 'जल्द आ रहा है' },
  badgeColor: 'bg-yellow-600'
},

    {
      id: 'food',
      icon: ShoppingBag,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBorder: 'hover:border-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'lifestyle',
      popularity: 72,
      users: 'Coming Soon',
      rating: 0,
      title: {
        hi: 'खाद्य सेवाएं',
        en: 'Food Services',
        ur: 'کھانے کی خدمات',
        te: 'ఆహార సేవలు',
        mr: 'अन्न सेवा',
        pa: 'ਭੋਜਨ ਸੇਵਾਵਾਂ'
      },
      description: {
        hi: 'रेस्टोरेंट खोजें, होम डिलीवरी, खाद्य आपूर्ति',
        en: 'Find restaurants, home delivery, food supplies',
        ur: 'ریستوراں تلاش کریں، ہوم ڈیلیوری',
        te: 'రెస్టారెంట్లను కనుగొనండి, హోమ్ డెలివరీ',
        mr: 'रेस्टॉरंट शोधा, होम डिलिव्हरी',
        pa: 'ਰੈਸਟੋਰੈਂਟ ਲੱਭੋ, ਹੋਮ ਡਿਲੀਵਰੀ'
      },
      features: ['Restaurants', 'Home Delivery', 'Food Supplies', 'Track Order'],
      available: true,
      badge: { en: 'New', hi: 'नया' },
      badgeColor: 'bg-orange-600'
    },
    {
      id: 'shopping',
      icon: Shirt,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      hoverBorder: 'hover:border-pink-500',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      category: 'lifestyle',
      popularity: 65,
      users: 'Coming Soon',
      rating: 0,
      title: {
        hi: 'ऑनलाइन शॉपिंग',
        en: 'Online Shopping',
        ur: 'آن لائن خریداری',
        te: 'ఆన్‌లైన్ షాపింగ్',
        mr: 'ऑनलाइन खरेदी',
        pa: 'ਔਨਲਾਈਨ ਖਰੀਦਦਾਰੀ'
      },
      description: {
        hi: 'कपड़े, जूते, इलेक्ट्रॉनिक्स, घरेलू सामान खरीदें',
        en: 'Buy clothes, shoes, electronics, household items',
        ur: 'کپڑے، جوتے، الیکٹرونکس خریدیں',
        te: 'దుస్తులు, పాదరక్షలు, ఎలక్ట్రానిక్స్ కొనండి',
        mr: 'कपडे, पादत्राणे, इलेक्ट्रॉनिक्स खरेदी',
        pa: 'ਕੱਪੜੇ, ਜੁੱਤੇ, ਇਲੈਕਟ੍ਰਾਨਿਕਸ ਖਰੀਦੋ'
      },
      features: ['Fashion', 'Electronics', 'Home Items', 'Best Deals'],
      available: true,
      badge: { en: 'Sale', hi: 'सेल' },
      badgeColor: 'bg-pink-600'
    },


    // Add these inside the existing `services` array

{
  id: 'finance',
  icon: TrendingUp,
  color: 'teal',
  gradient: 'from-teal-500 to-cyan-500',
  bgColor: 'bg-teal-50',
  borderColor: 'border-teal-200',
  hoverBorder: 'hover:border-teal-500',
  iconBg: 'bg-teal-100',
  iconColor: 'text-teal-600',
  category: 'essential',
  popularity: 80,
  users: 'Coming Soon',
  rating: 0,
  title: {
    hi: 'वित्त सेवाएं',
    en: 'Finance Services',
    ur: 'مالی خدمات',
    te: 'వित्त సేవలు',
    mr: 'वित्त सेवा',
    pa: 'ਵਿੱਤੀ ਸੇਵਾਵਾਂ'
  },
  description: {
    hi: 'कृषि ऋण, बैंकिंग, बीमा, निवेश सलाह',
    en: 'Agri loans, banking, insurance, investment advice',
    ur: 'زرعی قرض، بینکنگ، انشورنس، سرمایہ کاری مشورہ',
    te: 'వ్యవసాయ రుణాలు, బ్యాంకింగ్, ఇన్సూరెన్స్, పెట్టుబడి సలహా',
    mr: 'शेती कर्ज, बँकिंग, विमा, गुंतवणूक सल्ला',
    pa: 'ਕ੍ਰਿਸ਼ੀ ਕਰਜ਼, ਬੈਂਕਿੰਗ, ਬੀਮਾ, ਨਿਵੇਸ਼ ਸਲਾਹ'
  },
  features: ['Banking', 'Insurance', 'Loans', 'Investment Advice'],
  available: false,
  badge: { en: 'Coming Soon', hi: 'नया' },
  badgeColor: 'bg-teal-600'
},
{
  id: 'books',
  icon: Book,
  color: 'cyan',
  gradient: 'from-cyan-500 to-blue-500',
  bgColor: 'bg-cyan-50',
  borderColor: 'border-cyan-200',
  hoverBorder: 'hover:border-cyan-500',
  iconBg: 'bg-cyan-100',
  iconColor: 'text-cyan-600',
  category: 'education',
  popularity: 70,
  users: 'Coming Soon',
  rating: 0,
  title: {
    hi: 'पुस्तकें और अध्ययन सामग्री',
    en: 'Books & Study Material',
    ur: 'کتابیں اور مطالعہ کا مواد',
    te: 'పుస్తకాలు & స్టడీ మెటీరియల్',
    mr: 'पुस्तके आणि अभ्यास साहित्य',
    pa: 'ਕਿਤਾਬਾਂ ਅਤੇ ਅਧਿਐਨ ਸਮੱਗਰੀ'
  },
  description: {
    hi: 'शिक्षा सामग्री, ई-पुस्तकें, अध्ययन गाइड',
    en: 'Educational content, e-books, study guides',
    ur: 'تعلیمی مواد، ای بکس، مطالعہ کے رہنما',
    te: 'శిక్షణా సబ్జెక్ట్స్, ఇ-బుక్స్, స్టడీ గైడ్‌లు',
    mr: 'शैक्षणिक सामग्री, ई-बुक्स, अभ्यास मार्गदर्शक',
    pa: 'ਸਿੱਖਿਆ ਸਮੱਗਰੀ, ਈ-ਕਿਤਾਬਾਂ, ਅਧਿਐਨ ਗਾਈਡ'
  },
  features: ['E-books', 'Study Guides', 'Tutorials', 'Exam Prep'],
  available: false,
  badge: { en: 'Coming Soon', hi: 'लोकप्रिय' },
  badgeColor: 'bg-cyan-600'
},

{
  id: 'utilities',
  icon: Cloud,
  color: 'gray',
  gradient: 'from-gray-500 to-slate-500',
  bgColor: 'bg-gray-50',
  borderColor: 'border-gray-200',
  hoverBorder: 'hover:border-gray-500',
  iconBg: 'bg-gray-100',
  iconColor: 'text-gray-600',
  category: 'essential',
  popularity: 68,
  users: 'Coming Soon',
  rating: 0,
  title: {
    hi: 'सुविधाएं और बिल भुगतान',
    en: 'Utilities & Bill Payments',
    ur: 'یوٹیلٹیز اور بل ادائیگی',
    te: 'యుటిలిటీస్ & బిల్ చెల్లింపులు',
    mr: 'सुविधा व बिल पेमेंट',
    pa: 'ਸਹੂਲਤਾਂ ਅਤੇ ਬਿੱਲ ਭੁਗਤਾਨ'
  },
  description: {
    hi: 'बिजली, पानी, गैस, इंटरनेट बिल और भुगतान',
    en: 'Electricity, water, gas, internet bills and payments',
    ur: 'بجلی، پانی، گیس، انٹرنیٹ بلز اور ادائیگی',
    te: 'విద్యుత్, నీరు, గ్యాస్, ఇంటర్నెట్ బిల్లులు & చెల్లింపులు',
    mr: 'वीज, पाणी, गॅस, इंटरनेट बिल आणि पेमेंट',
    pa: 'ਬਿਜਲੀ, ਪਾਣੀ, ਗੈਸ, ਇੰਟਰਨੈਟ ਬਿੱਲ ਅਤੇ ਭੁਗਤਾਨ'
  },
  features: ['Electricity', 'Water', 'Gas', 'Internet Payments'],
  available: false,
  badge: { en: 'Coming Soon', hi: 'नया' },
  badgeColor: 'bg-gray-600'
},
{
  id: 'community',
  icon: Users,
  color: 'purple',
  gradient: 'from-purple-500 to-pink-500',
  bgColor: 'bg-purple-50',
  borderColor: 'border-purple-200',
  hoverBorder: 'hover:border-purple-500',
  iconBg: 'bg-purple-100',
  iconColor: 'text-purple-600',
  category: 'social',
  popularity: 85,
  users: 'Coming Soon',
  rating: 0,
  title: {
    hi: 'समुदाय सहायता',
    en: 'Community Support',
    ur: 'کمیونٹی سپورٹ',
    te: 'కమ్యూనిటీ సపోర్ట్',
    mr: 'समुदाय सहाय्यता',
    pa: 'ਕਮਿਊਨਿਟੀ ਸਹਾਇਤਾ'
  },
  description: {
    hi: 'स्थानीय नेटवर्क, स्वयंसेवक, सामुदायिक कार्यक्रम',
    en: 'Local networks, volunteers, community programs',
    ur: 'مقامی نیٹ ورک، رضاکار، کمیونٹی پروگرامز',
    te: 'స్థానిక నెట్‌వర్క్‌లు, వాలంటీర్స్, కమ్యూనిటీ ప్రోగ్రామ్‌లు',
    mr: 'स्थानिक नेटवर्क, स्वयंसेवक, सामुदायिक कार्यक्रम',
    pa: 'ਸਥਾਨਕ ਨੈੱਟਵਰਕ, ਸੇਵਾਕ, ਕਮਿਊਨਿਟੀ ਪ੍ਰੋਗ੍ਰਾਮ'
  },
  features: ['Volunteers', 'Local Programs', 'Events', 'Networking'],
  available: false,
  badge: { en: 'Coming Soon', hi: 'ट्रेंडिंग' },
  badgeColor: 'bg-purple-600'
}

  ];

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('app_language', langCode);
  };

  const getTranslation = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      dashboard: { hi: 'डैशबोर्ड', en: 'Dashboard', ur: 'ڈیش بورڈ', te: 'డాష్‌బోర్డ్', mr: 'डॅशबोर्ड', pa: 'ਡੈਸ਼ਬੋਰਡ' },
      search: { hi: 'खोजें...', en: 'Search...', ur: 'تلاش کریں...', te: 'వెతకండి...', mr: 'शोधा...', pa: 'ਖੋਜੋ...' },
      chooseService: { hi: 'अपनी आवश्यकता के अनुसार सेवा चुनें', en: 'Choose a service based on your needs', ur: 'اپنی ضروریات کے مطابق خدمت منتخب کریں', te: 'మీ అవసరాలను బట్టి సేవను ఎంచుకోండి', mr: 'तुमच्या गरजेनुसार सेवा निवडा', pa: 'ਆਪਣੀ ਲੋੜ ਅਨੁਸਾਰ ਸੇਵਾ ਚੁਣੋ' },
      open: { hi: 'खोलें', en: 'Open', ur: 'کھولیں', te: 'తెరవండి', mr: 'उघडा', pa: 'ਖੋਲ੍ਹੋ' },
      users: { hi: 'उपयोगकर्ता', en: 'users', ur: 'صارفین', te: 'వినియోగదారులు', mr: 'वापरकर्ते', pa: 'ਵਰਤੋਂਕਾਰ' },
      quickAccess: { hi: 'त्वरित पहुंच', en: 'Quick Access', ur: 'فوری رسائی', te: 'త్వరిత యాక్సెస్', mr: 'त्वरित प्रवेश', pa: 'ਤੇਜ਼ ਪਹੁੰਚ' },
      recentlyUsed: { hi: 'हाल ही में उपयोग किया गया', en: 'Recently Used', ur: 'حال ہی میں استعمال', te: 'ఇటీవల ఉపయోగించబడింది', mr: 'अलीकडे वापरलेले', pa: 'ਹਾਲ ਹੀ ਵਿੱਚ ਵਰਤਿਆ' },
      needHelp: { hi: 'मदद चाहिए?', en: 'Need Help?', ur: 'مدد چاہیے؟', te: 'సహాయం కావాలా?', mr: 'मदत हवी आहे?', pa: 'ਮਦਦ ਚਾਹੀਦੀ ਹੈ?' },
      contactSupport: { hi: '24/7 सहायता उपलब्ध', en: '24/7 support available', ur: '24/7 معاونت دستیاب', te: '24/7 మద్దతు అందుబాటులో', mr: '24/7 समर्थन उपलब्ध', pa: '24/7 ਸਹਾਇਤਾ ਉਪਲਬਧ' },
      logout: { hi: 'बाहर जाएं', en: 'Logout', ur: 'لاگ آؤٹ', te: 'లాగ్అవుట్', mr: 'बाहेर पडा', pa: 'ਲਾਗਆਉਟ' }
    };
    return translations[key]?.[selectedLanguage] || translations[key]?.['en'] || '';
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title[selectedLanguage as keyof typeof service.title]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'essential' && service.category === 'essential') ||
                         (activeFilter === 'popular' && service.popularity > 80) ||
                         (activeFilter === 'recent' && !service.available);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">SevaMitra</h1>
                <p className="text-xs text-gray-500">{getTranslation('dashboard')}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                    <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`p-3 rounded-lg ${notif.unread ? 'bg-blue-50' : 'bg-gray-50'}`}>
                          <p className="text-sm text-gray-900">{notif.message[selectedLanguage as keyof typeof notif.message] || notif.message.en}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-8 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName}
                    </option>
                  ))}
                </select>
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* User Menu */}
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* User Info Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-blue-100 text-sm flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.village}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">11</div>
                <div className="text-xs text-blue-100">Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">6</div>
                <div className="text-xs text-blue-100">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">₹0</div>
                <div className="text-xs text-blue-100">Cost</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Actions Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getTranslation('search')}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
            onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const FilterIcon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <FilterIcon className="w-4 h-4" />
                <span className="text-sm">
                  {filter.label[selectedLanguage as keyof typeof filter.label]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-gray-900">{getTranslation('quickAccess')}</h3>
            </div>
            <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {services.filter(s => s.available).slice(0, 4).map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => onServiceSelect(service.id)}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-2`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">
                    {service.title[selectedLanguage as keyof typeof service.title]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
          : 'space-y-4 mb-12'
        }>
          {filteredServices.map((service) => {
            const Icon = service.icon;
            
            if (viewMode === 'list') {
              return (
                <button
                  key={service.id}
                  onClick={() => service.available ? onServiceSelect(service.id) : null}
                  disabled={!service.available}
                  className={`w-full flex items-center bg-white rounded-xl border-2 ${service.borderColor} p-6 text-left transition-all ${
                    service.available
                      ? `${service.hoverBorder} hover:shadow-lg cursor-pointer`
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {service.title[selectedLanguage as keyof typeof service.title]}
                      </h3>
                      {service.available && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {service.description[selectedLanguage as keyof typeof service.description]}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {service.available ? (
                        <>
                          <span>👥 {service.users} {getTranslation('users')}</span>
                          <span>⭐ {service.rating}</span>
                        </>
                      ) : (
                        <span className="text-amber-600 font-medium">{service.badge[selectedLanguage as keyof typeof service.badge]}</span>
                      )}
                    </div>
                  </div>

                  {service.available && (
                    <ChevronRight className={`w-6 h-6 ${service.iconColor} flex-shrink-0`} />
                  )}
                </button>
              );
            }

            return (
              <button
                key={service.id}
                onClick={() => service.available ? onServiceSelect(service.id) : null}
                disabled={!service.available}
                className={`relative ${service.bgColor} rounded-xl border-2 ${service.borderColor} p-6 text-left transition-all ${
                  service.available
                    ? `${service.hoverBorder} hover:shadow-lg cursor-pointer transform hover:-translate-y-1`
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  {service.available ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className={`text-xs ${service.badgeColor} text-white px-2 py-1 rounded-full font-bold`}>
                        {service.badge[selectedLanguage as keyof typeof service.badge]}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {service.badge[selectedLanguage as keyof typeof service.badge]}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title[selectedLanguage as keyof typeof service.title]}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {service.description[selectedLanguage as keyof typeof service.description]}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-white/60 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full border border-gray-200">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  {service.available ? (
                    <>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span>👥 {service.users}</span>
                        <span>⭐ {service.rating}</span>
                      </div>
                      <div className={`flex items-center ${service.iconColor} text-sm font-semibold`}>
                        <span className="mr-1">{getTranslation('open')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {service.badge[selectedLanguage as keyof typeof service.badge]}
                    </div>
                  )}
                </div>

                {/* Bookmark */}
                <button className="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <Bookmark className="w-4 h-4 text-gray-400" />
                </button>
              </button>
            );
          })}
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Help Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">{getTranslation('needHelp')}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {getTranslation('contactSupport')}
            </p>
            <a
              href="tel:1800-180-1104"
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>1800-180-1104</span>
            </a>
          </div>

          {/* Privacy Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">100% Secure</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your data is encrypted and protected. We never share your information.
            </p>
          </div>

          {/* Community Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Join Community</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Connect with 10,000+ users and share experiences
            </p>
            <button className="text-sm font-semibold text-purple-600 hover:text-purple-700">
              Learn More →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;