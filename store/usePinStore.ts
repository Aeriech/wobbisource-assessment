import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pin } from '@/types/pin';

interface PinState {
  pins: Pin[];
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
  updatePin: (id: string, updatedFields: Partial<Pin>) => void;
}

// store/usePinStore.ts
export const usePinStore = create<PinState>()(
  persist(
    (set) => ({
      pins: [],
      addPin: (pin) => set((state) => ({ pins: [...state.pins, pin] })),
      removePin: (id) => set((state) => ({ 
        pins: state.pins.filter((p) => p.id !== id) 
      })),
      // Add this new function:
      updatePin: (id, updatedFields) => set((state) => ({
        pins: state.pins.map((p) => p.id === id ? { ...p, ...updatedFields } : p)
      })),
    }),
    { name: 'pin-storage' }
  )
);