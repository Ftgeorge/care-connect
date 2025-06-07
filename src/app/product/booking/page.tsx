'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaVideo, FaCalendarAlt } from 'react-icons/fa';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availability: string[];
  image: string;
}

const dummyDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Emily Carter',
    specialty: 'General Practitioner',
    availability: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    image: '/doctor1.jpg',
  },
  {
    id: 2,
    name: 'Dr. David Lee',
    specialty: 'Pediatrician',
    availability: ['09:00 AM', '10:00 AM', '01:00 PM', '04:00 PM'],
    image: '/doctor2.jpg',
  },
  {
    id: 3,
    name: 'Dr. Sarah Chen',
    specialty: 'Internal Medicine',
    availability: ['11:00 AM', '12:00 PM', '03:00 PM', '05:00 PM'],
    image: '/doctor3.jpg',
  },
];

export default function DoctorBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBookNow = () => {
    if (selectedDoctor && selectedTime) {
      // TODO: Implement booking logic and payment integration
      alert(`Booking consultation with ${selectedDoctor.name} at ${selectedTime}`);
    } else {
      alert('Please select a doctor and a time slot.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#2D3436] mb-4">
            Book a Doctor Consultation
          </h1>
          <p className="text-[#636e72]">
            Find and book a live video consultation with a licensed doctor.
          </p>
        </motion.div>

        {/* Doctor List */}
        <div className="space-y-6 mb-8">
          {dummyDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-colors ${selectedDoctor?.id === doctor.id ? 'border-2 border-[#D98586]' : ''}`}
              onClick={() => {
                setSelectedDoctor(doctor);
                setSelectedTime(null); // Reset time when doctor changes
              }}
            >
              <div className="flex items-center space-x-4">
                {/* Doctor Image Placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                  {/* In a real app, use an Image component with doctor.image */}
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3436]">{doctor.name}</h3>
                  <p className="text-[#636e72] text-sm">{doctor.specialty}</p>
                </div>
              </div>
              
              {selectedDoctor?.id === doctor.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <h4 className="text-lg font-medium text-[#2D3436] mb-3">Available Slots:</h4>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availability.map(time => (
                      <button
                        key={time}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent clicking time from selecting doctor again
                          setSelectedTime(time);
                        }}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedTime === time ? 'bg-[#D98586] text-white' : 'bg-gray-100 text-[#2D3436] hover:bg-gray-200'}`}
                      >
                        <FaClock className="inline-block mr-1" /> {time}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleBookNow}
                    disabled={!selectedTime}
                    className={`mt-6 w-full px-6 py-3 text-white rounded-lg text-center transition-colors ${!selectedTime ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D98586] hover:bg-[#D98586]/90'}`}
                  >
                    <FaVideo className="inline-block mr-2" />
                    Book Video Consultation
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Placeholder for Calendar View (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dummyDoctors.length * 0.1 + 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-[#2D3436] mb-4">Schedule Later</h2>
          <p className="text-[#636e72] mb-4">Select a date and view more availability.</p>
          {/* TODO: Implement a calendar component for date selection */}
          <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-[#636e72]">
            <FaCalendarAlt className="mr-2" /> Calendar Placeholder
          </div>
        </motion.div>
      </div>
    </div>
  );
} 