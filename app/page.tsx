'use client';
import dynamic from 'next/dynamic';
import PinList from '@/components/PinList';

// We import the Map component dynamically so it only loads on the client side
const MapContainer = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />
});

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar - Pin List */}
      <section className="w-1/3 h-full border-r bg-white overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Map Pin Board</h1>
        
        <div id="pin-list" className="flex-1">
          <PinList />
        </div>
      </section>

      {/* Map Section */}
      <section className="flex-1 h-full relative">
        <MapContainer />
      </section>
    </main>
  );
}