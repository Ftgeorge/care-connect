'use client';

import BookAppointmentSection from '@/components/product/BookAppointmentSection';
import { useState, useEffect, useRef } from 'react';
import { FaClock, FaVideo, FaCalendarAlt, FaTimes, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  distance: number;
  availability: {
    date: string;
    slots: string[];
  }[];
  image: string;
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
  onDoctorHover?: (doctor: Doctor | null) => void;
  isBackground?: boolean;
}

function DoctorMap({ userLocation, doctors, onDoctorSelect, onDoctorHover, isBackground = false }: DoctorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Load Leaflet script dynamically
    const loadLeaflet = () => {
      return new Promise((resolve) => {
        // Check if Leaflet is already loaded
        if (window.L) {
          resolve(window.L);
          return;
        }

        // Load CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
          document.head.appendChild(link);
        }

        // Load JS
        if (!document.querySelector('script[src*="leaflet.js"]')) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
          script.onload = () => resolve(window.L);
          document.head.appendChild(script);
        } else {
          resolve(window.L);
        }
      });
    };

    loadLeaflet().then((L: any) => {
      // Initialize the map
      const map = L.map(mapRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 13,
        zoomControl: !isBackground,
        attributionControl: !isBackground
      });

      // Add CartoDB light tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // User location marker
      const userIcon = L.divIcon({
        html: `
          <div class="user-marker" style="
            width: 20px;
            height: 20px;
            background: #D98586;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(217, 133, 134, 0.6);
            position: relative;
          ">
            <div style="
              position: absolute;
              top: -8px;
              left: -8px;
              width: 36px;
              height: 36px;
              background: rgba(217, 133, 134, 0.2);
              border-radius: 50%;
              animation: pulse 2s infinite;
            "></div>
          </div>
        `,
        className: 'user-location-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<div style="text-align: center; font-weight: 600; color: #2D3436;">📍 Your Location</div>');

      // Create doctor markers
      doctors.forEach((doctor) => {
        const doctorIcon = L.divIcon({
          html: `
            <div class="doctor-marker-container" data-doctor-id="${doctor.id}" style="
              position: relative;
              cursor: pointer;
              transform: scale(1);
              transition: transform 0.2s ease;
            ">
              <div class="doctor-marker" style="
                width: 50px;
                height: 50px;
                background: white;
                border: 4px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                position: relative;
              ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19 14C19 16.2091 17.2091 18 15 18C12.7909 18 11 16.2091 11 14C11 11.7909 12.7909 10 15 10C17.2091 10 19 11.7909 19 14Z"/>
                  <path d="M15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z" fill="#D98586"/>
                  <path d="M9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2V9C7 10.6569 5.65685 12 4 12C2.34315 12 1 10.6569 1 9V8C1 7.44772 1.44772 7 2 7C2.55228 7 3 7.44772 3 8V9C3 9.55228 3.44772 10 4 10C4.55228 10 5 9.55228 5 9V2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2V9C7 11.7614 9.23858 14 12 14H13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="doctor-label" style="
                position: absolute;
                top: 55px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.2s ease;
                pointer-events: none;
                z-index: 1000;
              ">
                ${doctor.name}
              </div>
            </div>
          `,
          className: 'custom-doctor-marker',
          iconSize: [50, 70],
          iconAnchor: [25, 25]
        });

        const marker = L.marker([doctor.location.lat, doctor.location.lng], {
          icon: doctorIcon
        }).addTo(map);

        // Store doctor reference on marker
        marker.doctorData = doctor;

        // Hover events using DOM events
        marker.on('add', () => {
          const markerElement = marker.getElement();
          if (markerElement) {
            markerElement.addEventListener('mouseenter', () => {
              const container = markerElement.querySelector('.doctor-marker-container');
              const label = markerElement.querySelector('.doctor-label');
              if (container) container.style.transform = 'scale(1.1)';
              if (label) label.style.opacity = '1';
              onDoctorHover?.(doctor);
            });

            markerElement.addEventListener('mouseleave', () => {
              const container = markerElement.querySelector('.doctor-marker-container');
              const label = markerElement.querySelector('.doctor-label');
              if (container) container.style.transform = 'scale(1)';
              if (label) label.style.opacity = '0';
              onDoctorHover?.(null);
            });
          }
        });

        // Click event
        marker.on('click', () => {
          onDoctorSelect?.(doctor);
        });
      });

      // Disable interaction for background maps
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

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, doctors, onDoctorSelect, onDoctorHover, isBackground]);

  return (
    <div
      ref={mapRef}
      className={`w-full ${isBackground ? 'h-full absolute inset-0' : 'h-[600px]'} ${isBackground ? '' : 'rounded-2xl overflow-hidden'}`}
      style={{ zIndex: isBackground ? 0 : 1 }}
    />
  );
}

export default function DoctorBooking() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [hoveredDoctor, setHoveredDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Abuja coordinates as fallback
          setUserLocation({ lat: 9.0765, lng: 7.3986 });
        }
      );
    } else {
      // Default to Abuja coordinates if geolocation is not supported
      setUserLocation({ lat: 9.0765, lng: 7.3986 });
    }

    // Load dummy doctor data
    const dummyDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialization: 'General Practitioner',
        rating: 4.8,
        distance: 2.5,
        availability: [
          {
            date: '2025-06-09',
            slots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
          },
          {
            date: '2025-06-10',
            slots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
          },
        ],
        image: '/doctors/doctor1.jpg',
        location: { lat: 9.0765, lng: 7.3986 }, // Central Business District, Abuja
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialization: 'Pediatrician',
        rating: 4.9,
        distance: 3.2,
        availability: [
          {
            date: '2025-06-09',
            slots: ['10:00', '11:00', '15:00', '16:00'],
          },
          {
            date: '2025-06-10',
            slots: ['09:00', '10:00', '14:00', '15:00'],
          },
        ],
        image: '/doctors/doctor2.jpg',
        location: { lat: 9.0579, lng: 7.4951 }, // Garki, Abuja
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        specialization: 'Dermatologist',
        rating: 4.7,
        distance: 1.8,
        availability: [
          {
            date: '2025-06-09',
            slots: ['11:00', '12:00', '16:00', '17:00'],
          },
          {
            date: '2025-06-10',
            slots: ['10:00', '11:00', '15:00', '16:00'],
          },
        ],
        image: '/doctors/doctor3.jpg',
        location: { lat: 9.0412, lng: 7.4898 }, // Wuse II, Abuja
      },
      {
        id: '4',
        name: 'Dr. James Wilson',
        specialization: 'Cardiologist',
        rating: 4.9,
        distance: 4.1,
        availability: [
          {
            date: '2025-06-09',
            slots: ['09:00', '10:00', '14:00', '15:00'],
          },
          {
            date: '2025-06-10',
            slots: ['11:00', '12:00', '16:00', '17:00'],
          },
        ],
        image: '/doctors/doctor4.jpg',
        location: { lat: 9.0643, lng: 7.4892 }, // Maitama, Abuja
      },
      {
        id: '5',
        name: 'Dr. Lisa Park',
        specialization: 'Neurologist',
        rating: 4.6,
        distance: 5.2,
        availability: [
          {
            date: '2025-06-09',
            slots: ['10:00', '11:00', '15:00', '16:00'],
          },
          {
            date: '2025-06-10',
            slots: ['09:00', '12:00', '14:00', '17:00'],
          },
        ],
        image: '/doctors/doctor5.jpg',
        location: { lat: 9.1084, lng: 7.4224 }, // Gwarinpa, Abuja
      },
    ];

    setDoctors(dummyDoctors);
    setIsLoading(false);
  }, []);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDrawerOpen(true);
    setSelectedDate('');
    setSelectedSlot('');
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedDoctor(null), 300); // Wait for animation
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;
    alert(`Booking appointment with ${selectedDoctor.name} on ${selectedDate} at ${selectedSlot}`);
  };

  const handleStartVideoCall = () => {
    if (!selectedDoctor) return;
    alert(`Starting video call with ${selectedDoctor.name}`);
  };

  if (isLoading || !userLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .user-marker {
          animation: pulse 2s infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Header */}
        <div className="relative z-20 bg-white/90 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Doctors Near You</h1>
            <p className="text-gray-600">Click on map markers to book appointments</p>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-screen">
          <DoctorMap
            userLocation={userLocation}
            doctors={doctors}
            onDoctorSelect={handleDoctorSelect}
            onDoctorHover={setHoveredDoctor}
            isBackground={false}
          />

          {/* Hover Tooltip */}
          {hoveredDoctor && (
            <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 max-w-xs transform transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {hoveredDoctor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{hoveredDoctor.name}</h3>
                  <p className="text-sm text-gray-600">{hoveredDoctor.specialization}</p>
                  <div className="flex items-center mt-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-sm text-gray-600 ml-1">
                      {hoveredDoctor.rating} • {hoveredDoctor.distance} km
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer */}
        <div className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}>
          <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 h-[60vh] flex flex-col">
            {selectedDoctor && (
              <>
                {/* Fixed Header */}
                <div className="flex-shrink-0 p-6 border-b border-gray-100">
                  {/* Handle Bar */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                  {/* Doctor Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h3>
                        <p className="text-gray-600 text-lg">{selectedDoctor.specialization}</p>
                        <div className="flex items-center mt-1">
                          <FaStar className="text-yellow-400" />
                          <span className="text-gray-600 ml-1 font-medium">
                            {selectedDoctor.rating} • {selectedDoctor.distance} km away
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeDrawer}
                      className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Book Appointment */}
                    <BookAppointmentSection/>

                    {/* Video Consultation */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaVideo className="mr-3 text-green-600" />
                        Video Consultation
                      </h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Need immediate attention? Start a video consultation with{' '}
                        <span className="font-semibold text-gray-800">{selectedDoctor.name}</span> right away.
                      </p>
                      <button
                        onClick={handleStartVideoCall}
                        className="w-full px-4 py-3 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 font-semibold"
                      >
                        <FaVideo className="inline mr-2" />
                        Start Video Call
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Overlay when drawer is open */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={closeDrawer}
          />
        )}
      </div>
    </>
  );
}