'use client';

import type { Pin } from '@/types/pin';
import { usePinStore } from '@/store/usePinStore';
import { Trash2, MapPin } from 'lucide-react';

export default function PinList() {
  const pins = usePinStore((state) => state.pins);
  const removePin = usePinStore((state) => state.removePin);

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
      {pins.map((pin: Pin) => (
        <div
          key={pin.id}
          className="p-4 bg-gray-50 border rounded-lg hover:shadow-md transition-shadow group relative"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {pin.address}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
              </p>
            </div>
            <button
              type="button"
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