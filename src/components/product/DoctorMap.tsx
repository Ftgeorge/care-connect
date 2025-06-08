'use client';

import { useEffect, useRef } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  distance: number;
  location: {
    lat: number;
    lng: number;
  };
}

interface DoctorMapProps {
  userLocation: {
    lat: number;
    lng: number;
  };
  doctors: Doctor[];
  onDoctorSelect?: (doctor: Doctor) => void;
  isBackground?: boolean;
}

export default function DoctorMap({ userLocation, doctors, onDoctorSelect, isBackground = false }: DoctorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Initialize the map
      const map = L.map(mapRef.current!).setView([userLocation.lat, userLocation.lng], 13);

      // Add light-themed CartoDB tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Custom icon for user location
      const userIcon = L.divIcon({
        html: `
          <div style="
            background: #D98586;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(217, 133, 134, 0.5);
          "></div>
        `,
        className: 'user-location-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      // Add user location marker
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<div style="text-align: center; font-weight: 500;">📍 Your Location</div>');

      // Stethoscope icon SVG
      const stethoscopeIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 14C19 16.2091 17.2091 18 15 18C12.7909 18 11 16.2091 11 14C11 11.7909 12.7909 10 15 10C17.2091 10 19 11.7909 19 14Z" fill="#2563eb"/>
          <path d="M15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z" fill="white"/>
          <path d="M9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2V9C7 10.6569 5.65685 12 4 12C2.34315 12 1 10.6569 1 9V8C1 7.44772 1.44772 7 2 7C2.55228 7 3 7.44772 3 8V9C3 9.55228 3.44772 10 4 10C4.55228 10 5 9.55228 5 9V2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2V9C7 11.7614 9.23858 14 12 14H13" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;

      // Create doctor markers
      doctors.forEach((doctor) => {
        const doctorIcon = L.divIcon({
          html: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            ">
              <div style="
                background: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: 2px solid #2563eb;
                margin-bottom: 4px;
              ">
                ${stethoscopeIcon}
              </div>
              <div style="
                background: #2563eb;
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
                max-width: 120px;
                text-align: center;
                line-height: 1.2;
              ">
                ${doctor.name}
              </div>
            </div>
          `,
          className: 'doctor-marker',
          iconSize: [120, 70],
          iconAnchor: [60, 70]
        });
        
        const marker = L.marker([doctor.location.lat, doctor.location.lng], { 
          icon: doctorIcon 
        }).addTo(map);

        // Create popup content
        const popupContent = `
          <div style="min-width: 200px; text-align: center;">
            <div style="
              background: #2563eb;
              color: white;
              padding: 8px;
              margin: -8px -8px 12px -8px;
              border-radius: 4px 4px 0 0;
            ">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">
                ${doctor.name}
              </h3>
            </div>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #636e72; font-weight: 500;">
              ${doctor.specialization}
            </p>
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
              <span style="color: #fbbf24; font-size: 16px;">★</span>
              <span style="margin-left: 4px; font-size: 14px; color: #636e72; font-weight: 500;">
                ${doctor.rating} • ${doctor.distance} km away
              </span>
            </div>
            <button 
              onclick="window.selectDoctor('${doctor.id}')"
              style="
                background: #D98586;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 600;
                transition: all 0.2s;
                width: 100%;
              "
              onmouseover="this.style.background='#c77374'"
              onmouseout="this.style.background='#D98586'"
            >
              Select Doctor
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: true,
          className: 'custom-popup'
        });

        // Add click handler
        marker.on('click', () => {
          if (onDoctorSelect) {
            onDoctorSelect(doctor);
          }
        });
      });

      // Global function for popup button clicks
      (window as any).selectDoctor = (doctorId: string) => {
        const doctor = doctors.find(d => d.id === doctorId);
        if (doctor && onDoctorSelect) {
          onDoctorSelect(doctor);
        }
        map.closePopup();
      };

      // If it's a background map, disable interaction
      if (isBackground) {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
      }

      mapInstanceRef.current = map;
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      delete (window as any).selectDoctor;
    };
  }, [userLocation, doctors, onDoctorSelect, isBackground]);

  return (
    <>
      {/* Leaflet CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <div 
        ref={mapRef} 
        className={`w-full ${isBackground ? 'h-full absolute inset-0' : 'h-[600px]'} ${isBackground ? '' : 'rounded-2xl overflow-hidden'}`}
        style={{ zIndex: isBackground ? 0 : 1 }}
      />
      {/* Leaflet JS */}
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    </>
  );
}