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
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={address.latitude ? 16 : 4} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(address.latitude && address.longitude) && (
          <Marker position={[address.latitude, address.longitude]} />
        )}
        <MapEvents onChange={onChange} setPosition={setPosition} />
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}
