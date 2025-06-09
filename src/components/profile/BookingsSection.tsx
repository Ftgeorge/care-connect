'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export default function BookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load bookings from localStorage
    const loadBookings = () => {
      const storedBookings = localStorage.getItem('userBookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
      setIsLoading(false);
    };

    loadBookings();
  }, []);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaSpinner className="text-yellow-500 animate-spin" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCalendarAlt className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
        <p className="text-gray-600">Your appointment history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {booking.doctorName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{booking.doctorName}</h3>
                  <p className="text-sm text-gray-600">{booking.specialization}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCalendarAlt className="text-gray-400" />
                <span>{new Date(booking.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaClock className="text-gray-400" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaUserMd className="text-gray-400" />
                <span>Doctor: {booking.doctorName}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>In-person Visit</span>
              </div>
            </div>

            {booking.status === 'pending' && (
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Cancel Booking
                </button>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Reschedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 