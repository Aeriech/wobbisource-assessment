'use client';

import type { Pin } from '@/types/pin';
import { usePinStore } from '@/store/usePinStore';
import { Trash2, MapPin } from 'lucide-react';

export default function PinList() {
  const pins = usePinStore((state) => state.pins);
  const removePin = usePinStore((state) => state.removePin);
  const setMapCenter = usePinStore((state) => state.setMapCenter);

  if (pins.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/80 p-8 text-center text-slate-500 shadow-sm">
        <div>
          <p className="text-lg font-medium text-slate-700">No pins dropped yet.</p>
          <p className="mt-2 text-sm text-slate-500">Tap the map to start saving locations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pins.map((pin: Pin) => (
        <div
          key={pin.id}
          className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-inner"
              onClick={() => setMapCenter(pin.lat, pin.lng)}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setMapCenter(pin.lat, pin.lng)}
                className="w-full text-left"
              >
                <p className="text-sm font-semibold text-slate-900 line-clamp-2 transition hover:text-slate-700">
                  {pin.address}
                </p>
              </button>
              <p className="mt-2 text-xs text-slate-500 font-mono">
                {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
              </p>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => removePin(pin.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                title="Delete Pin"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
