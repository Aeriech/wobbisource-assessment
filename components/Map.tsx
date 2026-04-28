'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { usePinStore } from '@/store/usePinStore';
import { v4 as uuidv4 } from 'uuid';

// Fix for default Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapEvents() {
  const addPin = usePinStore((state) => state.addPin);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      // 1. Reverse Geocoding via Nominatim API 
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        const address = data.display_name || "Unknown Address";

        // 2. Add the pin to our Zustand store
        addPin({
          id: uuidv4(), // Standard web API for unique IDs
          lat,
          lng,
          address,
        });
      } catch (error) {
        console.error("Geocoding failed:", error);
      }
    },
  });

  return null;
}

export default function Map() {
  const pins = usePinStore((state) => state.pins);

  return (
    <MapContainer
      center={[16.4023, 120.5960]} // Default to Baguio City coordinates
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* MapEvents handles the click logic */}
      <MapEvents />

      {/* Render all pins from the store */}
      {pins.map((pin) => (
        <Marker 
          key={pin.id} 
          position={[pin.lat, pin.lng]} 
          icon={icon} 
        />
      ))}
    </MapContainer>
  );
}