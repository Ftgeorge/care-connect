'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface BookAppointmentSectionProps {
  selectedDate?: string;
  selectedSlot?: string;
  onDateSelect?: (date: string) => void;
  onSlotSelect?: (slot: string) => void;
  availability?: {
    date: string;
    slots: string[];
  }[];
  doctor?: {
    id: string;
    name: string;
    specialization: string;
  };
}

export default function BookAppointmentSection({
  selectedDate,
  selectedSlot,
  onDateSelect,
  onSlotSelect,
  availability = [],
  doctor
}: BookAppointmentSectionProps) {
  const router = useRouter();
  const [selectedDateLocal, setSelectedDateLocal] = useState(selectedDate || '');
  const [selectedSlotLocal, setSelectedSlotLocal] = useState(selectedSlot || '');
  const [isBooking, setIsBooking] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDateLocal(date);
    setSelectedSlotLocal('');
    onDateSelect?.(date);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlotLocal(slot);
    onSlotSelect?.(slot);
  };

  const handleBookAppointment = () => {
    if (!doctor || !selectedDateLocal || !selectedSlotLocal) return;

    setIsBooking(true);

    // Create new booking
    const newBooking = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: selectedDateLocal,
      time: selectedSlotLocal,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    // Get existing bookings
    const existingBookings = localStorage.getItem('userBookings');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];

    // Add new booking
    bookings.push(newBooking);

    // Save to localStorage
    localStorage.setItem('userBookings', JSON.stringify(bookings));

    // Navigate to profile page
    setTimeout(() => {
      router.push('/product/bookings');
    }, 1000);
  };

  // Get available slots for selected date
  const availableSlots = availability.find(day => day.date === selectedDateLocal)?.slots || [];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FaCalendarAlt className="mr-3 text-blue-600" />
        Book Appointment
      </h4>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availability.map((day) => (
            <button
              key={day.date}
              onClick={() => handleDateSelect(day.date)}
              className={`p-3 rounded-lg text-center transition-colors ${
                selectedDateLocal === day.date
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDateLocal && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotSelect(slot)}
                className={`p-2 rounded-lg text-center transition-colors ${
                  selectedSlotLocal === slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      {selectedDateLocal && selectedSlotLocal && (
        <button
          onClick={handleBookAppointment}
          disabled={isBooking}
          className={`w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center ${
            isBooking ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isBooking ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Booking...
            </>
          ) : (
            'Book Appointment'
          )}
        </button>
      )}
    </div>
  );
}