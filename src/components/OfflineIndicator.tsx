import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  return (
    <div
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
        isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}
    >
      {isOnline ? (
        <Wifi className="w-4 h-4" />
      ) : (
        <WifiOff className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {isOnline ? 'Online' : 'Offline Mode'}
      </span>
    </div>
  );
};

export default OfflineIndicator;