'use client';
import dynamic from 'next/dynamic';
import PinList from '@/components/PinList';
import ColourfulText from '@/components/ui/colourful-text';

// We import the Map component dynamically so it only loads on the client side
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
});

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">

      {/* Sidebar - Pin List */}
      {/* Mobile: 40% height, full width | Desktop: full height, 1/3 width */}
      <section className="w-full h-[40vh] md:h-full md:w-1/3 border-b md:border-b-0 md:border-r bg-white overflow-y-auto p-4 flex flex-col order-2 md:order-1">
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          <ColourfulText text="Map Pin Board" />
        </h1>

        <div id="pin-list" className="flex-1">
          <PinList />
        </div>
      </section>

      {/* Map Section */}
      {/* Mobile: 60% height | Desktop: flex-1 (remaining space) */}
      <section className="w-full h-[60vh] md:h-full md:flex-1 relative order-1 md:order-2">
        <Map />
      </section>

    </main>
  );
}