import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pin } from '@/types/pin';

interface PinState {
  pins: Pin[];
  center: { lat: number; lng: number };
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
  updatePin: (id: string, updatedFields: Partial<Pin>) => void;
  setMapCenter: (lat: number, lng: number) => void;
}

// store/usePinStore.ts
export const usePinStore = create<PinState>()(
  persist(
    (set) => ({
      pins: [],
      center: { lat: 16.4023, lng: 120.5960 },
      addPin: (pin) => set((state) => ({ pins: [...state.pins, pin] })),
      
      removePin: (id) => set((state) => ({ 
        pins: state.pins.filter((p) => p.id !== id) 
      })),
      
      updatePin: (id, updatedFields) => set((state) => ({
        pins: state.pins.map((p) => p.id === id ? { ...p, ...updatedFields } : p)
      })),
      
      setMapCenter: (lat, lng) => set(() => ({ center: { lat, lng } })),
    }),
    { name: 'pin-storage' }
  )
);