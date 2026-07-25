/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMapEvents, useMap } from "react-leaflet";
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
  html: `<div class="relative flex flex-col items-center justify-center">
           <div class="absolute w-10 h-10 bg-blue-500/30 rounded-full animate-ping" style="animation-duration: 2.5s;"></div>
           <div class="relative z-10 flex items-center justify-center w-11 h-11 bg-linear-to-tr from-blue-700 via-blue-600 to-indigo-500 rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.45)] border-2 border-white transform transition-transform hover:scale-110">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white drop-shadow">
               <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.724 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
             </svg>
           </div>
           <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-indigo-600 -mt-1 shadow-sm"></div>
           <div class="w-5 h-1.5 bg-black/30 rounded-full blur-[1.5px] mt-0.5"></div>
         </div>`,
  iconSize: [44, 52],
  iconAnchor: [22, 48],
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
    }, 1000); 

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [address.streetAddress, address.city, address.state, address.zipCode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="group relative w-full h-full min-h-75 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.1)] border border-slate-200 bg-white transition-all duration-300">
      {/* Top Right Glassmorphic Status Badge */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-md text-white">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wide">
            {address.streetAddress ? "Location Verified" : "Pin Location"}
          </span>
        </div>
      </div>

      {/* Bottom Left Helper Badge */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-slate-700 pointer-events-none">
        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span className="text-[11px] font-bold text-slate-800">
          Click map to set pin
        </span>
      </div>

      {/* Map Container */}
      <MapContainer 
        center={position} 
        zoom={address.latitude ? 16 : 4} 
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={false}
        className="w-full h-full z-0"
      >
        <ZoomControl position="topleft" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={premiumIcon}>
          <Tooltip 
            permanent 
            direction="top" 
            offset={[0, -28]}
            className="premium-map-tooltip"
          >
            <div className="flex items-center gap-2.5 max-w-55">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-xs text-white truncate tracking-wide">
                  {address.streetAddress || "Selected Property"}
                </span>
                {(address.city || address.state || address.zipCode) && (
                  <span className="text-[11px] font-medium text-slate-300 truncate mt-0.5">
                    {[address.city, address.state, address.zipCode].filter(Boolean).join(", ")}
                  </span>
                )}
              </div>
            </div>
          </Tooltip>
        </Marker>
        <MapEvents onChange={onChange} setPosition={setPosition} />
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}
