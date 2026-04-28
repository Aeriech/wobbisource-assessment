import { create } from 'zustand';
import { Pin } from '@/types/pin';

interface PinState {
  pins: Pin[];
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
}

export const usePinStore = create<PinState>((set) => ({
  pins: [],
  addPin: (pin) => set((state) => ({ pins: [...state.pins, pin] })),
  removePin: (id) => set((state) => ({ 
    pins: state.pins.filter((p) => p.id !== id) 
  })),
}));