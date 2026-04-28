'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { usePinStore } from '@/store/usePinStore';
import { useMemo, useRef } from 'react';

// Fix for default Leaflet icon
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Logic for clicking the map to add a new pin
function MapEvents() {
  const addPin = usePinStore((state) => state.addPin);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const address = await fetchAddress(lat, lng);
      addPin({ id: crypto.randomUUID(), lat, lng, address });
    },
  });
  return null;
}

// Helper function for geocoding (required by assessment) 
async function fetchAddress(lat: number, lng: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || "Unknown Address";
  } catch {
    return "Error fetching address";
  }
}

function DraggableMarker({ pin }: { pin: any }) {
  const updatePin = usePinStore((state) => state.updatePin);
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          // Fetch new address based on dropped location
          const newAddress = await fetchAddress(newPos.lat, newPos.lng);
          
          // Update the store
          updatePin(pin.id, { 
            lat: newPos.lat, 
            lng: newPos.lng, 
            address: newAddress 
          });
        }
      },
    }),
    [pin.id, updatePin]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[pin.lat, pin.lng]}
      icon={icon}
      ref={markerRef}
    />
  );
}

export default function Map() {
  const pins = usePinStore((state) => state.pins);

  return (
    <MapContainer
      center={[16.4023, 120.5960]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      {pins.map((pin) => (
        <DraggableMarker key={pin.id} pin={pin} />
      ))}
    </MapContainer>
  );
}