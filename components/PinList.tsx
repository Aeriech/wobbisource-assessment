'use client';

import { usePinStore } from '@/store/usePinStore';
import { Trash2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PinList() {
  const [mounted, setMounted] = useState(false);
  const { pins, removePin } = usePinStore();

  // Wait until the component is mounted on the client to show the pins
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (pins.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No pins dropped yet.</p>
        <p className="text-sm">Click the map to start pinning!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pins.map((pin) => (
        <div 
          key={pin.id} 
          className="p-4 bg-gray-50 border rounded-lg hover:shadow-md transition-shadow group relative"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {pin.address}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
              </p>
            </div>
            <button
              onClick={() => removePin(pin.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete Pin"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}