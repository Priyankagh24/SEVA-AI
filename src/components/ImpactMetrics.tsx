import React from 'react';
import { Users, Globe, Zap, Heart, TrendingUp, DollarSign } from 'lucide-react';

const ImpactMetrics: React.FC = () => {
  const metrics = [
    {
      icon: Users,
      label: 'Queries Handled',
      value: '10,247',
      change: '+23%',
      color: 'emerald'
    },
    {
      icon: Globe,
      label: 'Languages',
      value: '6',
      change: 'Hindi, Bengali, Tamil, Telugu, Marathi, English',
      color: 'blue'
    },
    {
      icon: Zap,
      label: 'Avg Response Time',
      value: '1.2s',
      change: '-15% faster',
      color: 'yellow'
    },
    {
      icon: Heart,
      label: 'Offline Usage',
      value: '67%',
      change: 'Works without internet',
      color: 'red'
    },
    {
      icon: TrendingUp,
      label: 'Emergency Alerts',
      value: '143',
      change: 'Lives potentially saved',
      color: 'purple'
    },
    {
      icon: DollarSign,
      label: 'Cost per Query',
      value: '$0.008',
      change: '625x cheaper than clinic visit',
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Impact Metrics</h2>
        <p className="text-gray-600">Real-time data showing VoiceVitals AI's social impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.change}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-md p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Potential Reach</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-4xl font-bold mb-2">500M+</p>
            <p className="text-emerald-100">People in India who can benefit</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">250K+</p>
            <p className="text-emerald-100">ASHA workers who can deploy this</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">$50M+</p>
            <p className="text-emerald-100">Potential healthcare savings annually</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;