import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen, Mic, MicOff, Send, Award, Star, X, ChevronRight, Clock,
  Play, CheckCircle, Download, MessageCircle, GraduationCap, Target,
  Users, TrendingUp, Book, FileText, Headphones, Video, Image as ImageIcon
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface VoiceEducationProps {
  language: string;
  setLanguage?: (lang: string) => void;
  onBack?: () => void;
  userData?: { name?: string; language?: string } | null;
}

const grades = [
  { id: '6-8', label: 'Class 6-8', labelHi: 'कक्षा 6-8' },
  { id: '9-10', label: 'Class 9-10', labelHi: 'कक्षा 9-10' },
  { id: '11-12', label: 'Class 11-12', labelHi: 'कक्षा 11-12' },
  { id: 'competitive', label: 'Competitive Exams', labelHi: 'प्रतियोगी परीक्षा' },
  { id: 'vocational', label: 'Vocational Training', labelHi: 'व्यावसायिक प्रशिक्षण' },
  { id: 'language', label: 'Language Learning', labelHi: 'भाषा सीखना' }
];

const subjects = {
  '6-8': [
    {
      id: 'math-68',
      name: 'Mathematics',
      nameHi: 'गणित',
      icon: '🔢',
      chapters: [
        { id: 1, name: 'Number Systems', nameHi: 'संख्या प्रणाली', pages: 45 },
        { id: 2, name: 'Algebra Basics', nameHi: 'बीजगणित मूल बातें', pages: 38 },
        { id: 3, name: 'Geometry', nameHi: 'ज्यामिति', pages: 52 },
        { id: 4, name: 'Fractions & Decimals', nameHi: 'भिन्न और दशमलव', pages: 41 },
        { id: 5, name: 'Mensuration', nameHi: 'क्षेत्रमिति', pages: 36 }
      ]
    },
    {
      id: 'science-68',
      name: 'Science',
      nameHi: 'विज्ञान',
      icon: '🔬',
      chapters: [
        { id: 1, name: 'Living Organisms', nameHi: 'जीवित जीव', pages: 48 },
        { id: 2, name: 'Matter & Materials', nameHi: 'पदार्थ और सामग्री', pages: 42 },
        { id: 3, name: 'Force & Motion', nameHi: 'बल और गति', pages: 39 },
        { id: 4, name: 'Light & Sound', nameHi: 'प्रकाश और ध्वनि', pages: 44 },
        { id: 5, name: 'Electricity', nameHi: 'बिजली', pages: 35 }
      ]
    },
    {
      id: 'english-68',
      name: 'English',
      nameHi: 'अंग्रेजी',
      icon: '📚',
      chapters: [
        { id: 1, name: 'Grammar Fundamentals', nameHi: 'व्याकरण मूल बातें', pages: 40 },
        { id: 2, name: 'Reading Comprehension', nameHi: 'पढ़ने की समझ', pages: 35 },
        { id: 3, name: 'Writing Skills', nameHi: 'लेखन कौशल', pages: 38 },
        { id: 4, name: 'Vocabulary Building', nameHi: 'शब्दावली निर्माण', pages: 30 },
        { id: 5, name: 'Story Writing', nameHi: 'कहानी लेखन', pages: 32 }
      ]
    }
  ],
  '9-10': [
    {
      id: 'math-910',
      name: 'Mathematics',
      nameHi: 'गणित',
      icon: '🔢',
      chapters: [
        { id: 1, name: 'Real Numbers', nameHi: 'वास्तविक संख्याएं', pages: 42 },
        { id: 2, name: 'Polynomials', nameHi: 'बहुपद', pages: 38 },
        { id: 3, name: 'Linear Equations', nameHi: 'रैखिक समीकरण', pages: 45 },
        { id: 4, name: 'Quadratic Equations', nameHi: 'द्विघात समीकरण', pages: 40 },
        { id: 5, name: 'Trigonometry', nameHi: 'त्रिकोणमिति', pages: 48 },
        { id: 6, name: 'Statistics', nameHi: 'सांख्यिकी', pages: 36 },
        { id: 7, name: 'Probability', nameHi: 'प्रायिकता', pages: 32 }
      ]
    },
    {
      id: 'science-910',
      name: 'Science',
      nameHi: 'विज्ञान',
      icon: '🔬',
      chapters: [
        { id: 1, name: 'Chemical Reactions', nameHi: 'रासायनिक अभिक्रियाएं', pages: 44 },
        { id: 2, name: 'Life Processes', nameHi: 'जैव प्रक्रियाएं', pages: 46 },
        { id: 3, name: 'Electricity & Magnetism', nameHi: 'विद्युत और चुंबकत्व', pages: 42 },
        { id: 4, name: 'Light - Reflection & Refraction', nameHi: 'प्रकाश - परावर्तन और अपवर्तन', pages: 40 },
        { id: 5, name: 'Human Eye', nameHi: 'मानव नेत्र', pages: 35 },
        { id: 6, name: 'Periodic Classification', nameHi: 'आवर्त वर्गीकरण', pages: 38 },
        { id: 7, name: 'Carbon Compounds', nameHi: 'कार्बन यौगिक', pages: 41 }
      ]
    },
    {
      id: 'social-910',
      name: 'Social Studies',
      nameHi: 'सामाजिक अध्ययन',
      icon: '🌍',
      chapters: [
        { id: 1, name: 'Indian History', nameHi: 'भारतीय इतिहास', pages: 50 },
        { id: 2, name: 'Geography of India', nameHi: 'भारत का भूगोल', pages: 45 },
        { id: 3, name: 'Civics & Politics', nameHi: 'नागरिक शास्त्र और राजनीति', pages: 42 },
        { id: 4, name: 'Economics Basics', nameHi: 'अर्थशास्त्र मूल बातें', pages: 38 }
      ]
    }
  ],
  'competitive': [
    {
      id: 'ssc-prep',
      name: 'SSC Preparation',
      nameHi: 'SSC तैयारी',
      icon: '📝',
      chapters: [
        { id: 1, name: 'General Knowledge', nameHi: 'सामान्य ज्ञान', pages: 120 },
        { id: 2, name: 'Quantitative Aptitude', nameHi: 'मात्रात्मक योग्यता', pages: 95 },
        { id: 3, name: 'Reasoning', nameHi: 'तर्कशक्ति', pages: 88 },
        { id: 4, name: 'English Language', nameHi: 'अंग्रेजी भाषा', pages: 75 },
        { id: 5, name: 'Previous Year Papers', nameHi: 'पिछले वर्ष के प्रश्न पत्र', pages: 150 }
      ]
    },
    {
      id: 'bank-prep',
      name: 'Banking Exams',
      nameHi: 'बैंकिंग परीक्षा',
      icon: '🏦',
      chapters: [
        { id: 1, name: 'Banking Awareness', nameHi: 'बैंकिंग जागरूकता', pages: 85 },
        { id: 2, name: 'Financial Awareness', nameHi: 'वित्तीय जागरूकता', pages: 72 },
        { id: 3, name: 'Quantitative Aptitude', nameHi: 'मात्रात्मक योग्यता', pages: 90 },
        { id: 4, name: 'Reasoning Ability', nameHi: 'तर्क क्षमता', pages: 80 },
        { id: 5, name: 'English Language', nameHi: 'अंग्रेजी भाषा', pages: 68 }
      ]
    }
  ],
  'vocational': [
    {
      id: 'computer',
      name: 'Computer Fundamentals',
      nameHi: 'कंप्यूटर मूल बातें',
      icon: '💻',
      chapters: [
        { id: 1, name: 'Introduction to Computers', nameHi: 'कंप्यूटर का परिचय', pages: 35 },
        { id: 2, name: 'Operating Systems', nameHi: 'ऑपरेटिंग सिस्टम', pages: 42 },
        { id: 3, name: 'MS Office - Word', nameHi: 'एमएस ऑफिस - वर्ड', pages: 38 },
        { id: 4, name: 'MS Office - Excel', nameHi: 'एमएस ऑफिस - एक्सेल', pages: 45 },
        { id: 5, name: 'MS Office - PowerPoint', nameHi: 'एमएस ऑफिस - पावरपॉइंट', pages: 32 },
        { id: 6, name: 'Internet & Email', nameHi: 'इंटरनेट और ईमेल', pages: 28 },
        { id: 7, name: 'Cyber Safety', nameHi: 'साइबर सुरक्षा', pages: 30 }
      ]
    },
    {
      id: 'tailoring',
      name: 'Tailoring & Stitching',
      nameHi: 'सिलाई और कढ़ाई',
      icon: '🧵',
      chapters: [
        { id: 1, name: 'Basic Sewing Techniques', nameHi: 'बुनियादी सिलाई तकनीक', pages: 40 },
        { id: 2, name: 'Fabric Types & Selection', nameHi: 'कपड़े के प्रकार और चयन', pages: 35 },
        { id: 3, name: 'Pattern Making', nameHi: 'पैटर्न बनाना', pages: 45 },
        { id: 4, name: 'Garment Construction', nameHi: 'वस्त्र निर्माण', pages: 50 },
        { id: 5, name: 'Embroidery Basics', nameHi: 'कढ़ाई मूल बातें', pages: 38 },
        { id: 6, name: 'Machine Maintenance', nameHi: 'मशीन रखरखाव', pages: 25 },
        { id: 7, name: 'Business Setup', nameHi: 'व्यवसाय स्थापना', pages: 32 }
      ]
    }
  ],
  'language': [
    {
      id: 'english-speaking',
      name: 'English Speaking',
      nameHi: 'अंग्रेजी बोलना',
      icon: '🗣️',
      chapters: [
        { id: 1, name: 'Basic Greetings & Introductions', nameHi: 'बुनियादी अभिवादन और परिचय', pages: 30 },
        { id: 2, name: 'Daily Conversations', nameHi: 'दैनिक बातचीत', pages: 38 },
        { id: 3, name: 'Grammar Essentials', nameHi: 'व्याकरण आवश्यक', pages: 42 },
        { id: 4, name: 'Pronunciation Guide', nameHi: 'उच्चारण गाइड', pages: 35 },
        { id: 5, name: 'Workplace English', nameHi: 'कार्यस्थल अंग्रेजी', pages: 40 },
        { id: 6, name: 'Interviews & Presentations', nameHi: 'साक्षात्कार और प्रस्तुतियाँ', pages: 36 },
        { id: 7, name: 'Common Mistakes', nameHi: 'सामान्य गलतियाँ', pages: 28 }
      ]
    }
  ]
};

export default function VoiceEducation({ language = 'hi', setLanguage, onBack, userData }: VoiceEducationProps) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('subjects');
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [completedChapters, setCompletedChapters] = useState<Record<string, number[]>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [notes, setNotes] = useState('');

  const t = {
    en: {
      selectGrade: 'Select Your Grade/Category',
      subjects: 'Subjects',
      chapters: 'Chapters',
      progress: 'My Progress',
      readBook: 'Read E-Book',
      takeQuiz: 'Take Quiz',
      makeNotes: 'Make Notes',
      bookmark: 'Bookmark',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started'
    },
    hi: {
      selectGrade: 'अपनी कक्षा/श्रेणी चुनें',
      subjects: 'विषय',
      chapters: 'अध्याय',
      progress: 'मेरी प्रगति',
      readBook: 'ई-बुक पढ़ें',
      takeQuiz: 'क्विज़ लें',
      makeNotes: 'नोट्स बनाएं',
      bookmark: 'बुकमार्क',
      completed: 'पूर्ण',
      inProgress: 'प्रगति में',
      notStarted: 'शुरू नहीं किया'
    }
  }[language];

  useEffect(() => {
    const stored = localStorage.getItem('selected_grade');
    if (stored) setSelectedGrade(stored);

    const progress = localStorage.getItem('chapter_progress');
    if (progress) setCompletedChapters(JSON.parse(progress));

    const marks = localStorage.getItem('bookmarks');
    if (marks) setBookmarks(JSON.parse(marks));
  }, []);

  const saveGrade = (grade: string) => {
    setSelectedGrade(grade);
    localStorage.setItem('selected_grade', grade);
  };

  const markChapterComplete = (subjectId: string, chapterId: number) => {
    const key = subjectId;
    const current = completedChapters[key] || [];
    if (!current.includes(chapterId)) {
      const updated = { ...completedChapters, [key]: [...current, chapterId] };
      setCompletedChapters(updated);
      localStorage.setItem('chapter_progress', JSON.stringify(updated));
      toast.success(language === 'hi' ? '✅ अध्याय पूर्ण!' : '✅ Chapter completed!');
    }
  };

  const saveBookmark = () => {
    const key = `${selectedSubject.id}-${selectedChapter.id}`;
    const updated = { ...bookmarks, [key]: currentPage };
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
    toast.success(language === 'hi' ? '🔖 बुकमार्क सहेजा गया!' : '🔖 Bookmark saved!');
  };

  const downloadNotes = () => {
    const content = `
NOTES - ${selectedSubject?.name} - ${selectedChapter?.name}
Student: ${userData?.name || 'User'}
Date: ${new Date().toLocaleDateString()}

${notes}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${selectedSubject?.id}-${selectedChapter?.id}.txt`;
    a.click();
    toast.success(language === 'hi' ? '📥 नोट्स डाउनलोड हुए!' : '📥 Notes downloaded!');
  };

  if (!selectedGrade) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {language === 'hi' ? 'SevaAI शिक्षा' : 'SevaAI Education'}
              </h1>
              <p className="text-xl text-gray-600">
                {t.selectGrade}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {grades.map(grade => (
                <button
                  key={grade.id}
                  onClick={() => saveGrade(grade.id)}
                  className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 hover:border-purple-400 transition-all transform hover:scale-105 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {grade.id.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {language === 'hi' ? grade.labelHi : grade.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'विषय और अध्याय देखें' : 'View subjects & chapters'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSubjects = subjects[selectedGrade as keyof typeof subjects] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <button onClick={onBack} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
              )}
              <div className="bg-white/20 p-2 rounded-xl">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SevaAI Education</h1>
                <p className="text-xs text-indigo-100">
                  {language === 'hi' 
                    ? grades.find(g => g.id === selectedGrade)?.labelHi
                    : grades.find(g => g.id === selectedGrade)?.label}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedGrade(null);
                  setSelectedSubject(null);
                  setSelectedChapter(null);
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium"
              >
                {language === 'hi' ? 'बदलें' : 'Change'}
              </button>
              {setLanguage && (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white/20 border-0 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur cursor-pointer"
                >
                  <option value="en" className="text-gray-900">🇬🇧 English</option>
                  <option value="hi" className="text-gray-900">🇮🇳 हिन्दी</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 py-2">
            <button
              onClick={() => {
                setActiveTab('subjects');
                setSelectedSubject(null);
                setSelectedChapter(null);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'subjects'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              {t.subjects}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'progress'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              {t.progress}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Subjects Grid */}
        {activeTab === 'subjects' && !selectedSubject && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t.subjects}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {currentSubjects.map(subject => {
                const totalChapters = subject.chapters.length;
                const completed = (completedChapters[subject.id] || []).length;
                const progress = (completed / totalChapters) * 100;

                return (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject)}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-300 transition-all transform hover:scale-105 text-left"
                  >
                    <div className="text-5xl mb-4">{subject.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{language === 'hi' ? subject.nameHi : subject.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{totalChapters} {language === 'hi' ? 'अध्याय' : 'chapters'}</p>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{t.progress}</span>
                        <span className="font-bold">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      {completed}/{totalChapters} {t.completed}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chapters List */}
        {activeTab === 'subjects' && selectedSubject && !selectedChapter && (
          <div>
            <button
              onClick={() => setSelectedSubject(null)}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              {language === 'hi' ? 'वापस' : 'Back to Subjects'}
            </button>

            <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100 mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedSubject.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    {language === 'hi' ? selectedSubject.nameHi : selectedSubject.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedSubject.chapters.length} {t.chapters}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {selectedSubject.chapters.map((chapter: any) => {
                const isCompleted = (completedChapters[selectedSubject.id] || []).includes(chapter.id);
                const bookmarkKey = `${selectedSubject.id}-${chapter.id}`;
                const hasBookmark = bookmarks[bookmarkKey];

                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setSelectedChapter(chapter);
                      setCurrentPage(hasBookmark || 1);
                    }}
                    className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-indigo-300 transition-all text-left relative"
                  >
                    {isCompleted && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center font-bold text-indigo-600 flex-shrink-0">
                        {chapter.id}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">
                          {language === 'hi' ? chapter.nameHi : chapter.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {chapter.pages} {language === 'hi' ? 'पृष्ठ' : 'pages'}
                          </span>
                          {hasBookmark && (
                            <span className="flex items-center gap-1 text-yellow-600">
                              <Star className="w-4 h-4 fill-yellow-500" />
                              {language === 'hi' ? 'बुकमार्क किया' : 'Bookmarked'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold inline-block ${
                      isCompleted 
                        ? 'bg-green-100 text-green-700'
                        : hasBookmark
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isCompleted 
                        ? t.completed
                        : hasBookmark
                        ? t.inProgress
                        : t.notStarted}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* E-Book Reader */}
        {activeTab === 'subjects' && selectedChapter && (
          <div>
            <button
              onClick={() => setSelectedChapter(null)}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              {language === 'hi' ? 'वापस अध्याय सूची में' : 'Back to Chapters'}
            </button>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* E-Book Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-100 overflow-hidden">
                  {/* Book Header */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">
                          {language === 'hi' ? selectedChapter.nameHi : selectedChapter.name}
                        </h2>
                        <p className="text-indigo-100">
                          {language === 'hi' ? selectedSubject.nameHi : selectedSubject.name} - {language === 'hi' ? 'अध्याय' : 'Chapter'} {selectedChapter.id}
                        </p>
                      </div>
                      <div className="text-4xl">{selectedSubject.icon}</div>
                    </div>

                    {/* Page Navigation */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ← {language === 'hi' ? 'पिछला' : 'Previous'}
                      </button>
                      
                      <div className="text-center">
                        <p className="text-sm text-indigo-100">{language === 'hi' ? 'पृष्ठ' : 'Page'}</p>
                        <p className="text-2xl font-bold">{currentPage} / {selectedChapter.pages}</p>
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(selectedChapter.pages, currentPage + 1))}
                        disabled={currentPage === selectedChapter.pages}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {language === 'hi' ? 'अगला' : 'Next'} →
                      </button>
                    </div>
                  </div>

                  {/* Book Content */}
                  <div className="p-8 min-h-[500px] bg-amber-50">
                    <div className="max-w-3xl mx-auto">
                      <h3 className="text-3xl font-bold mb-6 text-gray-900">
                        {language === 'hi' ? selectedChapter.nameHi : selectedChapter.name}
                      </h3>
                      
                      {/* Sample Content - Page-specific */}
                      <div className="prose prose-lg">
                        {currentPage === 1 && (
                          <>
                            <p className="text-lg leading-relaxed text-gray-800 mb-4">
                              {language === 'hi' 
                                ? `इस अध्याय में, हम ${selectedChapter.nameHi} के बारे में विस्तार से जानेंगे। यह विषय ${selectedSubject.nameHi} का एक महत्वपूर्ण हिस्सा है।`
                                : `In this chapter, we will learn about ${selectedChapter.name} in detail. This is an important part of ${selectedSubject.name}.`}
                            </p>
                            <h4 className="text-xl font-bold mt-6 mb-3 text-indigo-600">
                              {language === 'hi' ? 'परिचय' : 'Introduction'}
                            </h4>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {language === 'hi'
                                ? 'यह अध्याय आपको बुनियादी अवधारणाओं से शुरू करके उन्नत विषयों तक ले जाएगा। हम उदाहरणों और अभ्यास के माध्यम से सीखेंगे।'
                                : 'This chapter will take you from basic concepts to advanced topics. We will learn through examples and practice.'}
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                              <p className="text-blue-900 font-semibold">
                                💡 {language === 'hi' ? 'महत्वपूर्ण बिंदु:' : 'Key Point:'}
                              </p>
                              <p className="text-blue-800 mt-2">
                                {language === 'hi'
                                  ? 'इस अध्याय को पूरा करने के बाद, आप इस विषय की गहरी समझ प्राप्त करेंगे।'
                                  : 'After completing this chapter, you will gain deep understanding of this topic.'}
                              </p>
                            </div>
                          </>
                        )}

                        {currentPage === 2 && (
                          <>
                            <h4 className="text-xl font-bold mb-3 text-indigo-600">
                              {language === 'hi' ? 'मुख्य अवधारणाएं' : 'Main Concepts'}
                            </h4>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                              <li>{language === 'hi' ? 'पहली अवधारणा को समझना' : 'Understanding the first concept'}</li>
                              <li>{language === 'hi' ? 'व्यावहारिक अनुप्रयोग' : 'Practical applications'}</li>
                              <li>{language === 'hi' ? 'सामान्य गलतियों से बचना' : 'Avoiding common mistakes'}</li>
                              <li>{language === 'hi' ? 'उन्नत तकनीकें' : 'Advanced techniques'}</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                              {language === 'hi'
                                ? 'आइए प्रत्येक अवधारणा को उदाहरणों के साथ समझें। यह आपकी समझ को मजबूत करने में मदद करेगा।'
                                : 'Let\'s understand each concept with examples. This will help strengthen your understanding.'}
                            </p>
                          </>
                        )}

                        {currentPage > 2 && (
                          <>
                            <h4 className="text-xl font-bold mb-3 text-indigo-600">
                              {language === 'hi' ? `विषय ${currentPage - 2}` : `Topic ${currentPage - 2}`}
                            </h4>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {language === 'hi'
                                ? `यह पृष्ठ ${currentPage} है। यहां हम ${selectedChapter.nameHi} के महत्वपूर्ण पहलुओं को कवर करेंगे। प्रत्येक विषय को ध्यान से पढ़ें और समझें।`
                                : `This is page ${currentPage}. Here we will cover important aspects of ${selectedChapter.name}. Read and understand each topic carefully.`}
                            </p>
                            
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                              <p className="text-green-900 font-semibold">
                                ✏️ {language === 'hi' ? 'अभ्यास:' : 'Practice:'}
                              </p>
                              <p className="text-green-800 mt-2">
                                {language === 'hi'
                                  ? 'इस विषय से संबंधित प्रश्नों का अभ्यास करें। साइड पैनल में क्विज़ बटन पर क्लिक करें।'
                                  : 'Practice questions related to this topic. Click the quiz button in the side panel.'}
                              </p>
                            </div>

                            {currentPage === selectedChapter.pages && (
                              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mt-8">
                                <h4 className="text-xl font-bold text-yellow-900 mb-2">
                                  🎉 {language === 'hi' ? 'बधाई हो!' : 'Congratulations!'}
                                </h4>
                                <p className="text-yellow-800 mb-4">
                                  {language === 'hi'
                                    ? 'आपने यह अध्याय पूरा कर लिया है। अब इसे पूर्ण के रूप में चिह्नित करें।'
                                    : 'You have completed this chapter. Mark it as completed now.'}
                                </p>
                                <button
                                  onClick={() => {
                                    markChapterComplete(selectedSubject.id, selectedChapter.id);
                                    setTimeout(() => setSelectedChapter(null), 1500);
                                  }}
                                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
                                >
                                  ✓ {language === 'hi' ? 'पूर्ण चिह्नित करें' : 'Mark Complete'}
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Page Progress Bar */}
                      <div className="mt-8 pt-6 border-t-2 border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>{language === 'hi' ? 'पढ़ने की प्रगति' : 'Reading Progress'}</span>
                          <span className="font-bold">{Math.round((currentPage / selectedChapter.pages) * 100)}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                            style={{ width: `${(currentPage / selectedChapter.pages) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Tools */}
              <div className="space-y-4">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <h3 className="font-bold mb-4">{language === 'hi' ? 'त्वरित क्रियाएं' : 'Quick Actions'}</h3>
                  <div className="space-y-3">
                    <button
                      onClick={saveBookmark}
                      className="w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                    >
                      <Star className="w-5 h-5" />
                      {t.bookmark}
                    </button>

                    <button
                      onClick={() => setShowQuiz(true)}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      {t.takeQuiz}
                    </button>

                    <button
                      onClick={() => {
                        const text = language === 'hi' 
                          ? `${selectedChapter.nameHi} - पृष्ठ ${currentPage}: ${selectedSubject.nameHi} के इस अध्याय में महत्वपूर्ण विषय शामिल हैं।`
                          : `${selectedChapter.name} - Page ${currentPage}: This chapter of ${selectedSubject.name} covers important topics.`;
                        const utterance = new SpeechSynthesisUtterance(text);
                        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
                        window.speechSynthesis.speak(utterance);
                        toast.success(language === 'hi' ? '🔊 पढ़ रहा है...' : '🔊 Reading...');
                      }}
                      className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <Headphones className="w-5 h-5" />
                      {language === 'hi' ? 'सुनें' : 'Listen'}
                    </button>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <h3 className="font-bold mb-4">{t.makeNotes}</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === 'hi' ? 'अपने नोट्स यहाँ लिखें...' : 'Write your notes here...'}
                    className="w-full h-32 p-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-indigo-500"
                  ></textarea>
                  <button
                    onClick={downloadNotes}
                    disabled={!notes.trim()}
                    className="w-full mt-3 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {language === 'hi' ? 'नोट्स डाउनलोड करें' : 'Download Notes'}
                  </button>
                </div>

                {/* Chapter Info */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <h3 className="font-bold mb-3">{language === 'hi' ? 'अध्याय जानकारी' : 'Chapter Info'}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{language === 'hi' ? 'कुल पृष्ठ:' : 'Total Pages:'}</span>
                      <span className="font-bold">{selectedChapter.pages}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{language === 'hi' ? 'वर्तमान पृष्ठ:' : 'Current Page:'}</span>
                      <span className="font-bold">{currentPage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{language === 'hi' ? 'बचे हुए:' : 'Remaining:'}</span>
                      <span className="font-bold">{selectedChapter.pages - currentPage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t.progress}</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {currentSubjects.map(subject => {
                const totalChapters = subject.chapters.length;
                const completed = (completedChapters[subject.id] || []).length;
                const progress = (completed / totalChapters) * 100;

                return (
                  <div key={subject.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                    <div className="text-4xl mb-3">{subject.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{language === 'hi' ? subject.nameHi : subject.name}</h3>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">{t.progress}</span>
                        <span className="font-bold">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {completed}/{totalChapters} {language === 'hi' ? 'अध्याय' : 'chapters'}
                      </span>
                      {progress === 100 && (
                        <Award className="w-6 h-6 text-yellow-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall Progress */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{language === 'hi' ? 'कुल प्रगति' : 'Overall Progress'}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-indigo-100 mb-1">{language === 'hi' ? 'कुल विषय' : 'Total Subjects'}</p>
                  <p className="text-4xl font-bold">{currentSubjects.length}</p>
                </div>
                <div>
                  <p className="text-indigo-100 mb-1">{language === 'hi' ? 'पूर्ण अध्याय' : 'Completed Chapters'}</p>
                  <p className="text-4xl font-bold">
                    {Object.values(completedChapters).flat().length}
                  </p>
                </div>
                <div>
                  <p className="text-indigo-100 mb-1">{language === 'hi' ? 'बुकमार्क' : 'Bookmarks'}</p>
                  <p className="text-4xl font-bold">{Object.keys(bookmarks).length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuiz(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{language === 'hi' ? 'अभ्यास प्रश्नोत्तरी' : 'Practice Quiz'}</h3>
              <button onClick={() => setShowQuiz(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                {language === 'hi'
                  ? `${selectedChapter.name} पर आधारित प्रश्न`
                  : `Questions based on ${selectedChapter.name}`}
              </p>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="font-semibold mb-4">
                  {language === 'hi'
                    ? `Q1. ${selectedChapter.nameHi} का मुख्य उद्देश्य क्या है?`
                    : `Q1. What is the main objective of ${selectedChapter.name}?`}
                </p>
                <div className="space-y-2">
                  {[
                    language === 'hi' ? 'बुनियादी अवधारणाओं को समझना' : 'Understanding basic concepts',
                    language === 'hi' ? 'व्यावहारिक अनुप्रयोग सीखना' : 'Learning practical applications',
                    language === 'hi' ? 'उन्नत तकनीकों में महारत' : 'Mastering advanced techniques',
                    language === 'hi' ? 'उपरोक्त सभी' : 'All of the above'
                  ].map((option, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === 3) {
                          toast.success(language === 'hi' ? '✅ सही जवाब!' : '✅ Correct answer!');
                        } else {
                          toast.error(language === 'hi' ? '❌ गलत जवाब' : '❌ Wrong answer');
                        }
                      }}
                      className="w-full p-3 bg-white hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-300 rounded-lg text-left transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowQuiz(false)}
                className="w-full py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600"
              >
                {language === 'hi' ? 'और प्रश्न जल्द आ रहे हैं' : 'More questions coming soon'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p className="font-semibold mb-2">🎓 SevaAI Education Platform</p>
          <p className="text-sm">
            {language === 'hi' 
              ? 'सभी के लिए मुफ्त शिक्षा • गुणवत्तापूर्ण सामग्री • 24/7 उपलब्ध'
              : 'Free Education for All • Quality Content • Available 24/7'}
          </p>
        </div>
      </footer>
    </div>
  );
}