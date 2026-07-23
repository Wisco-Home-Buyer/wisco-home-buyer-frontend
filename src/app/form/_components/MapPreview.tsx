/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon paths in React/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const premiumIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="relative flex flex-col items-center justify-center w-12 h-12">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-blue-600 drop-shadow-lg relative z-10 animate-[bounce_2s_infinite]">
             <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.724 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
           </svg>
           <div class="absolute bottom-0.5 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-ping" style="animation-duration: 2s;"></div>
           <div class="absolute bottom-1 w-4 h-1.5 bg-black/20 rounded-[100%] blur-[1px]"></div>
         </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 46],
});

interface MapPreviewProps {
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number | null;
    longitude: number | null;
  };
  onChange: (fields: Partial<MapPreviewProps["address"]>) => void;
}

// Component to handle map clicks for Reverse Geocoding
function MapEvents({ onChange, setPosition }: { onChange: MapPreviewProps["onChange"]; setPosition: (p: L.LatLngExpression) => void }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
        const data = await response.json();
        
        if (data && data.address) {
          onChange({
            streetAddress: data.address.house_number ? `${data.address.house_number} ${data.address.road || ''}`.trim() : (data.address.road || ''),
            city: data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.county || data.address.municipality || '',
            state: data.address.state || '',
            zipCode: data.address.postcode || '',
            latitude: lat,
            longitude: lng,
          });
        }
      } catch (error) {
        console.error("Reverse geocoding error:", error);
      }
    },
  });
  return null;
}

// Component to update map view when position changes externally
function MapUpdater({ position }: { position: L.LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [map, position]);
  return null;
}

export default function MapPreview({ address, onChange }: MapPreviewProps) {
  // Default center (USA) if no location is available
  const defaultPosition: L.LatLngExpression = [39.8283, -98.5795];
  const [position, setPosition] = useState<L.LatLngExpression>(
    address.latitude && address.longitude ? [address.latitude, address.longitude] : defaultPosition
  );

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Forward Geocoding: when address changes
  useEffect(() => {
    const fullAddress = `${address.streetAddress} ${address.city} ${address.state} ${address.zipCode}`.trim();
    if (!fullAddress || fullAddress.length < 5) return;

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const query = new URLSearchParams({ q: fullAddress, format: "json", limit: "1" });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${query.toString()}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
          
          // Only update lat/lon if they are different to prevent infinite loops
          if (address.latitude !== lat || address.longitude !== lon) {
             onChange({ latitude: lat, longitude: lon });
          }
        }
      } catch (error) {
        console.error("Forward geocoding error:", error);
      }
    }, 1000); // 1-second debounce

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [address.streetAddress, address.city, address.state, address.zipCode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-full relative z-0 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
      <MapContainer 
        center={position} 
        zoom={address.latitude ? 16 : 4} 
        scrollWheelZoom={false}
        attributionControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {(address.latitude && address.longitude) && (
          <Marker position={[address.latitude, address.longitude]} icon={premiumIcon} />
        )}
        <MapEvents onChange={onChange} setPosition={setPosition} />
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}
