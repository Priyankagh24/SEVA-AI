import React, { useState, useEffect } from 'react';
import { X, History, Calendar, TrendingUp, Download, Trash2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface HealthHistoryProps {
  language: string;
  onClose: () => void;
}

interface HealthRecord {
  id: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  severity: 'low' | 'medium' | 'high';
  notes: string;
}

const HealthHistory: React.FC<HealthHistoryProps> = ({ language, onClose }) => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [view, setView] = useState<'list' | 'timeline' | 'stats'>('list');

  useEffect(() => {
    loadHealthHistory();
  }, []);

  const loadHealthHistory = () => {
    // Load from localStorage
    const saved = localStorage.getItem('voicevitals_health_history');
    if (saved) {
      setRecords(JSON.parse(saved));
    } else {
      // Mock data for demo
      const mockRecords: HealthRecord[] = [
        {
          id: '1',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          symptoms: ['Fever', 'Headache', 'Fatigue'],
          diagnosis: 'Common cold. Rest recommended, stay hydrated, take paracetamol if needed.',
          severity: 'medium',
          notes: 'Temperature was 101°F. Taking paracetamol.'
        },
        {
          id: '2',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          symptoms: ['Cough', 'Sore throat'],
          diagnosis: 'Upper respiratory infection. Steam inhalation recommended.',
          severity: 'low',
          notes: 'Started steam inhalation twice daily.'
        },
        {
          id: '3',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          symptoms: ['Stomach pain', 'Nausea'],
          diagnosis: 'Possible food poisoning. Advised ORS and light diet.',
          severity: 'medium',
          notes: 'Ate outside food. Feeling better after ORS.'
        },
        {
          id: '4',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          symptoms: ['Back pain'],
          diagnosis: 'Muscle strain. Apply hot compress and rest.',
          severity: 'low',
          notes: 'Pain after heavy lifting. Applied hot pack.'
        }
      ];
      setRecords(mockRecords);
      localStorage.setItem('voicevitals_health_history', JSON.stringify(mockRecords));
    }
  };

  const deleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem('voicevitals_health_history', JSON.stringify(updated));
    toast.success(language === 'hi' ? 'रिकॉर्ड हटाया गया' : 'Record deleted');
  };

  const exportHistory = () => {
    const data = JSON.stringify(records, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success(language === 'hi' ? 'निर्यात पूर्ण!' : 'Export complete!');
  };

  const clearAllHistory = () => {
    if (window.confirm(language === 'hi' ? 'सभी इतिहास हटाएं?' : 'Clear all history?')) {
      setRecords([]);
      localStorage.removeItem('voicevitals_health_history');
      toast.success(language === 'hi' ? 'सभी रिकॉर्ड हटाए गए' : 'All records cleared');
    }
  };

  const getSeverityColor = (severity: string) => {
    return severity === 'high' ? 'text-red-600 bg-red-100' :
           severity === 'medium' ? 'text-yellow-600 bg-yellow-100' :
           'text-green-600 bg-green-100';
  };

  const getSymptomStats = () => {
    const symptomCount: Record<string, number> = {};
    records.forEach(record => {
      record.symptoms.forEach(symptom => {
        symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
      });
    });
    return Object.entries(symptomCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <History className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {language === 'hi' ? 'स्वास्थ्य इतिहास' : 'Health History'}
                </h2>
                <p className="text-sm opacity-90">
                  {language === 'hi' ? 'आपके पिछले परामर्श और लक्षण' : 'Your past consultations and symptoms'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'list', label: language === 'hi' ? 'सूची' : 'List', icon: FileText },
              { id: 'timeline', label: language === 'hi' ? 'समयरेखा' : 'Timeline', icon: Calendar },
              { id: 'stats', label: language === 'hi' ? 'आंकड़े' : 'Stats', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    view === tab.id
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {records.length === 0 ? (
            <div className="text-center py-20">
              <History className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                {language === 'hi' ? 'कोई इतिहास नहीं' : 'No History Yet'}
              </h3>
              <p className="text-gray-500">
                {language === 'hi' 
                  ? 'जब आप लक्षण जांचकर्ता का उपयोग करेंगे तो आपका इतिहास यहां दिखाई देगा'
                  : 'Your health consultations will appear here when you use the symptom checker'}
              </p>
            </div>
          ) : (
            <>
              {view === 'list' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {language === 'hi' ? `कुल ${records.length} रिकॉर्ड` : `${records.length} Total Records`}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={exportHistory}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 text-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>{language === 'hi' ? 'निर्यात' : 'Export'}</span>
                      </button>
                      <button
                        onClick={clearAllHistory}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{language === 'hi' ? 'सभी हटाएं' : 'Clear All'}</span>
                      </button>
                    </div>
                  </div>

                  {records.map((record) => (
                    <div key={record.id} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(record.severity)}`}>
                              {record.severity === 'high' ? (language === 'hi' ? 'गंभीर' : 'High') :
                               record.severity === 'medium' ? (language === 'hi' ? 'मध्यम' : 'Medium') :
                               (language === 'hi' ? 'हल्का' : 'Low')}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(record.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {record.symptoms.map((symptom, idx) => (
                              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-3">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {language === 'hi' ? '📋 निदान:' : '📋 Diagnosis:'}
                        </h4>
                        <p className="text-gray-700">{record.diagnosis}</p>
                      </div>

                      {record.notes && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">
                            {language === 'hi' ? '📝 नोट्स:' : '📝 Notes:'}
                          </h4>
                          <p className="text-blue-800">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {view === 'timeline' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'hi' ? '📅 समय के अनुसार' : '📅 Timeline View'}
                  </h3>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>
                    
                    {records.map((record, idx) => (
                      <div key={record.id} className="relative pl-20 pb-8">
                        {/* Timeline Dot */}
                        <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white ${
                          record.severity === 'high' ? 'bg-red-500' :
                          record.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        
                        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                          <div className="text-sm text-gray-500 mb-2">
                            {new Date(record.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {record.symptoms.map((symptom, idx) => (
                              <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                {symptom}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-700 text-sm">{record.diagnosis}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === 'stats' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'hi' ? '📊 स्वास्थ्य आंकड़े' : '📊 Health Statistics'}
                  </h3>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                      <div className="text-3xl font-bold">{records.length}</div>
                      <div className="text-blue-100">{language === 'hi' ? 'कुल परामर्श' : 'Total Consultations'}</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
                      <div className="text-3xl font-bold">{records.filter(r => r.severity === 'high').length}</div>
                      <div className="text-red-100">{language === 'hi' ? 'गंभीर मामले' : 'Severe Cases'}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
                      <div className="text-3xl font-bold">
                        {records.length > 0 ? Math.round((Date.now() - new Date(records[records.length - 1].date).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                      </div>
                      <div className="text-green-100">{language === 'hi' ? 'दिन पहले अंतिम' : 'Days Since Last'}</div>
                    </div>
                  </div>

                  {/* Common Symptoms */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {language === 'hi' ? '🔥 सबसे आम लक्षण' : '🔥 Most Common Symptoms'}
                    </h4>
                    <div className="space-y-3">
                      {getSymptomStats().map(([symptom, count], idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-900">{symptom}</span>
                            <span className="text-sm text-gray-600">{count} {language === 'hi' ? 'बार' : 'times'}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${(count / records.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Severity Distribution */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {language === 'hi' ? '⚠️ गंभीरता वितरण' : '⚠️ Severity Distribution'}
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {['low', 'medium', 'high'].map(severity => {
                        const count = records.filter(r => r.severity === severity).length;
                        const percentage = records.length > 0 ? Math.round((count / records.length) * 100) : 0;
                        return (
                          <div key={severity} className={`p-4 rounded-xl text-center ${
                            severity === 'high' ? 'bg-red-100' :
                            severity === 'medium' ? 'bg-yellow-100' :
                            'bg-green-100'
                          }`}>
                            <div className={`text-3xl font-bold ${
                              severity === 'high' ? 'text-red-600' :
                              severity === 'medium' ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>{percentage}%</div>
                            <div className={`text-sm ${
                              severity === 'high' ? 'text-red-800' :
                              severity === 'medium' ? 'text-yellow-800' :
                              'text-green-800'
                            }`}>
                              {severity === 'high' ? (language === 'hi' ? 'गंभीर' : 'High') :
                               severity === 'medium' ? (language === 'hi' ? 'मध्यम' : 'Medium') :
                               (language === 'hi' ? 'हल्का' : 'Low')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;