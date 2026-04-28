'use client';
import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import PinList from '@/components/PinList';
import ColourfulText from '@/components/ui/colourful-text';
import Map from '@/components/Map';

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-400 flex-col gap-6 px-4 py-6 md:px-8">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Live map explorer
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                <ColourfulText text="Map Pin Board" />
              </h1>
            </div>
            <div className="rounded-3xl bg-slate-950/5 px-4 py-3 text-sm text-slate-600 shadow-sm shadow-slate-900/5">
              Click anywhere on the map to drop a pin. Drag markers to update location.
            </div>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 md:hidden"
            >
              <MapPin className="h-4 w-4" />
              View pins
            </button>
          </div>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <section className="hidden md:block h-[50vh] min-h-80 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl md:h-auto md:min-h-105">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Pins</p>
                <p className="text-2xl font-semibold text-slate-900">Saved locations</p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600">
                Real-time store
              </div>
            </div>

            <div id="pin-list" className="h-full overflow-y-auto pr-1">
              <PinList />
            </div>
          </section>

          <section className="h-[60vh] min-h-80 overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950/5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl md:h-auto md:min-h-105">
            <div className="flex h-full flex-col overflow-hidden">
              <div className="border-b border-slate-200/80 bg-white/70 px-6 py-4 text-sm font-medium text-slate-600 backdrop-blur-xl">
                Interactive map
              </div>
              <div className="flex-1 bg-slate-100">
                <Map />
              </div>
            </div>
          </section>
        </div>

        {sheetOpen ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 backdrop-blur-sm md:hidden">
            <div className="w-full max-w-xl overflow-hidden rounded-t-[2rem] bg-white/95 shadow-2xl shadow-slate-900/20">
              <div className="mx-auto mt-3 mb-3 h-1.5 w-14 rounded-full bg-slate-200" />
              <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Saved pins</p>
                  <p className="text-xs text-slate-500">Swipe down or tap close to hide.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto p-5">
                <PinList />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
