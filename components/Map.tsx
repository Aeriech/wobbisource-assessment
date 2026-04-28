'use client';

import type { LeafletMouseEvent } from 'leaflet';
import type { Pin } from '@/types/pin';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { usePinStore } from '@/store/usePinStore';
import { useCallback, useRef } from 'react';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

async function fetchAddress(lat: number, lng: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || 'Unknown Address';
  } catch {
    return 'Error fetching address';
  }
}

function MapEvents() {
  const addPin = usePinStore((state) => state.addPin);

  const handleClick = useCallback(
    async (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const address = await fetchAddress(lat, lng);
      addPin({ id: crypto.randomUUID(), lat, lng, address });
    },
    [addPin]
  );

  useMapEvents({ click: handleClick });
  return null;
}

function DraggableMarker({ pin }: { pin: Pin }) {
  const updatePin = usePinStore((state) => state.updatePin);
  const markerRef = useRef<L.Marker>(null);

  const handleDragEnd = useCallback(async () => {
    const marker = markerRef.current;
    if (!marker) return;

    const { lat, lng } = marker.getLatLng();
    const address = await fetchAddress(lat, lng);
    updatePin(pin.id, { lat, lng, address });
  }, [pin.id, updatePin]);

  return (
    <Marker
      draggable
      position={[pin.lat, pin.lng]}
      icon={markerIcon}
      ref={markerRef}
      eventHandlers={{ dragend: handleDragEnd }}
    />
  );
}

export default function Map() {
  const pins = usePinStore((state) => state.pins);

  return (
    <div className="h-full w-full bg-slate-100">
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
    </div>
  );
}
